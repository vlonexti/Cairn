'use strict';
// Updates for the desktop app itself (the website inside it updates on its own).
//
// Every time the app opens, and every few hours while it stays open, it asks GitHub for the newest release. When
// there is a newer one, every window shows a notice with an "Update now" button, and the system shows a
// notification too. One click downloads the update, checks it, installs it and restarts the app.
//
// The releases are the ones .github/workflows/desktop.yml publishes. Each carries latest.yml (Windows),
// latest-mac.yml and latest-linux.yml, which name the newest version, its files and their SHA-512 checksums.
// https://github.com/<repo>/releases/latest/download/<file> always answers with the newest release's file.
//
// How each kind of install is updated:
//   Windows, installed (Xenon-Setup):  electron-updater runs the new installer silently and starts the app again.
//   Windows, portable exe:             the new exe is downloaded and checked, put in place of the old one, started.
//   macOS (.zip or .dmg):              the app is not signed by Apple, which electron-updater's Mac route requires,
//                                      so the new .zip is downloaded and checked, unpacked with ditto, swapped in
//                                      for the old Xenon.app in the same folder, and started.
//   Linux AppImage / .deb:             electron-updater (a .deb asks for the administrator password, as apt would).
// When an install cannot be updated in place (a Mac app in a folder it cannot write to, such as Applications
// without an administrator), the button opens the download page instead.
//
//   XENON_UPDATE_URL=http://localhost:8099   uses another place for the release files (for testing)
//   XENON_UPDATE_DRYRUN=1                    downloads and checks, but installs nothing (for testing)
const { app, net, Notification, shell } = require('electron');
const { spawn, execFile } = require('child_process');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const FEED = (process.env.XENON_UPDATE_URL || 'https://github.com/vlonexti/Cairn/releases/latest/download').replace(/\/$/, '');
const PAGE = 'https://github.com/vlonexti/Cairn/releases/latest';
const EVERY = 4 * 60 * 60 * 1000;
const DRY = process.env.XENON_UPDATE_DRYRUN === '1';

let state = { phase: 'idle' };      // idle | checking | available | downloading | ready | installing | error | none
let broadcast = () => {};
let notified = '';
let electronUpdater = null;

const set = patch => { state = { ...state, ...patch }; broadcast(state); };

/** Which way this copy of the app is updated. */
function route() {
  if (!app.isPackaged && !process.env.XENON_UPDATE_URL) return 'off';
  if (process.platform === 'win32') return process.env.PORTABLE_EXECUTABLE_FILE ? 'portable' : 'nsis';
  if (process.platform === 'darwin') return 'mac';
  return 'linux';
}

/* ---------- reading the release ---------- */

function newer(a, b) {
  const x = String(a).split(/[.-]/).map(n => parseInt(n, 10) || 0), y = String(b).split(/[.-]/).map(n => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return false;
}

/** The small part of a latest*.yml this needs: the version and each file's name, checksum and size. */
function parseYml(text) {
  const version = (/^version:\s*['"]?([^'"\s]+)/m.exec(text) || [])[1] || '';
  const files = [];
  const re = /-\s+url:\s*['"]?([^'"\n]+?)['"]?\s*\n\s+sha512:\s*['"]?([^'"\n]+?)['"]?\s*\n\s+size:\s*(\d+)/g;
  let m;
  while ((m = re.exec(text))) files.push({ url: m[1].trim(), sha512: m[2].trim(), size: Number(m[3]) });
  return { version, files };
}

async function getText(url) {
  const res = await net.fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.text();
}

const ymlName = () => (process.platform === 'win32' ? 'latest.yml' : process.platform === 'darwin' ? 'latest-mac.yml' : 'latest-linux.yml');

/* ---------- downloading and checking a file ---------- */

async function download(url, file, expectSha512, onProgress) {
  const res = await net.fetch(url, { cache: 'no-store' });
  if (!res.ok || !res.body) throw new Error(`The download failed (${res.status}).`);
  const total = Number(res.headers.get('content-length')) || 0;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const out = fs.createWriteStream(file);
  const hash = crypto.createHash('sha512');
  let got = 0, last = 0;
  const reader = res.body.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = Buffer.from(value);
      hash.update(chunk);
      got += chunk.length;
      if (!out.write(chunk)) await new Promise(r => out.once('drain', r));
      if (total && Date.now() - last > 250) { last = Date.now(); onProgress(Math.round(got / total * 100)); }
    }
  } finally {
    await new Promise(r => out.end(r));
  }
  if (expectSha512 && hash.digest('base64') !== expectSha512) {
    try { fs.unlinkSync(file); } catch { /* gone */ }
    throw new Error('The download did not match its checksum, so it was not installed.');
  }
  return file;
}

const run = (cmd, args) => new Promise((resolve, reject) => execFile(cmd, args, (err, stdout, stderr) => (err ? reject(new Error(stderr || err.message)) : resolve(stdout))));

/* ---------- checking ---------- */

async function check() {
  const how = route();
  if (how === 'off' || ['checking', 'downloading', 'ready', 'installing'].includes(state.phase)) return;
  set({ phase: 'checking' });
  try {
    if (how === 'nsis' || how === 'linux') {
      const updater = loadElectronUpdater();
      const result = await updater.checkForUpdates();
      const version = result && result.updateInfo && result.updateInfo.version;
      if (version && newer(version, app.getVersion())) available(version);
      else set({ phase: 'none' });
      return;
    }
    const info = parseYml(await getText(`${FEED}/${ymlName()}`));
    if (info.version && newer(info.version, app.getVersion())) available(info.version, info);
    else set({ phase: 'none' });
  } catch (err) {
    set({ phase: 'idle', error: String((err && err.message) || err) });       // offline, or no release yet: quiet
  }
}

function available(version, info = null) {
  set({ phase: 'available', version, info, percent: 0, error: '' });
  if (notified === version || !Notification.isSupported()) return;
  notified = version;
  try {
    const note = new Notification({ title: 'Xenon update', body: `Version ${version} is ready. Click to update now.`, silent: false });
    note.on('click', () => update());
    note.show();
  } catch { /* the notice in the window is enough */ }
}

/* ---------- updating ---------- */

function loadElectronUpdater() {
  if (electronUpdater) return electronUpdater;
  const { autoUpdater } = require('electron-updater');
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.allowDowngrade = false;
  autoUpdater.disableDifferentialDownload = true;    // the older release's blockmap is not at the "latest" address
  autoUpdater.setFeedURL({ provider: 'generic', url: FEED });
  if (process.env.XENON_UPDATE_URL) autoUpdater.forceDevUpdateConfig = !app.isPackaged;
  autoUpdater.logger = null;
  autoUpdater.on('download-progress', p => set({ phase: 'downloading', percent: Math.round(p.percent || 0) }));
  autoUpdater.on('update-downloaded', () => set({ phase: 'ready', percent: 100 }));
  autoUpdater.on('error', err => set({ phase: 'error', error: String((err && err.message) || err) }));
  electronUpdater = autoUpdater;
  return autoUpdater;
}

async function update() {
  if (state.phase !== 'available' && state.phase !== 'error' && state.phase !== 'ready') return;
  const how = route();
  try {
    if (state.phase === 'ready' && (how === 'nsis' || how === 'linux')) return installElectronUpdater();
    if (how === 'nsis' || how === 'linux') {
      set({ phase: 'downloading', percent: 0, error: '' });
      await loadElectronUpdater().downloadUpdate();
      return installElectronUpdater();
    }
    if (how === 'portable') return await updatePortable();
    if (how === 'mac') return await updateMac();
  } catch (err) {
    set({ phase: 'error', error: String((err && err.message) || err) });
  }
}

function installElectronUpdater() {
  if (DRY) { set({ phase: 'ready', percent: 100, error: 'dry run: downloaded and checked, not installed' }); return; }
  set({ phase: 'installing' });
  // Silent install, then start the app again. The windows close as usual, so unsaved edits are sent first.
  setTimeout(() => loadElectronUpdater().quitAndInstall(true, true), 400);
}

const work = name => path.join(app.getPath('userData'), 'update', name);

/** Windows portable: the running exe can be renamed but not overwritten, so it is moved aside and replaced. */
async function updatePortable() {
  const exe = process.env.PORTABLE_EXECUTABLE_FILE;
  const version = state.version;
  set({ phase: 'downloading', percent: 0, error: '' });
  const info = parseYml(await getText(`${FEED}/latest.yml`));      // read again: a retry must not reuse old details
  const name = `Xenon-${info.version || version}-portable.exe`;
  const entry = info.files.find(f => f.url === name);          // listed when the release includes it
  const fresh = await download(`${FEED}/${name}`, work(name), entry ? entry.sha512 : '', percent => set({ percent }));
  if (fs.statSync(fresh).size < 20 * 1024 * 1024) throw new Error('The download was too small to be the app.');
  set({ phase: 'installing', percent: 100 });
  const old = `${exe}.old`;
  try { fs.unlinkSync(old); } catch { /* none */ }
  fs.renameSync(exe, old);
  try { fs.copyFileSync(fresh, exe); } catch (err) { fs.renameSync(old, exe); throw err; }
  try { fs.unlinkSync(fresh); } catch { /* fine */ }
  if (DRY) { set({ phase: 'ready', percent: 100, error: 'dry run: swapped in, not started' }); return; }
  spawn(exe, [], { detached: true, stdio: 'ignore' }).unref();
  app.exit(0);
}

/** The Xenon.app this is running from, or null when it cannot be replaced from here. */
function macBundle() {
  const bundle = path.resolve(process.execPath, '..', '..', '..');
  if (!bundle.endsWith('.app') || bundle.includes('/AppTranslocation/')) return null;
  try { fs.accessSync(path.dirname(bundle), fs.constants.W_OK); fs.accessSync(bundle, fs.constants.W_OK); } catch { return null; }
  return bundle;
}

/** macOS: download the new .zip, check it, unpack it, swap it in for this Xenon.app, and start it. */
async function updateMac() {
  const bundle = macBundle();
  if (!bundle) { shell.openExternal(PAGE); set({ phase: 'available', error: 'This copy is in a folder Xenon cannot change (Applications needs an administrator). The download page is open; or keep Xenon.app on the Desktop and it updates itself.' }); return; }
  set({ phase: 'downloading', percent: 0, error: '' });
  const info = parseYml(await getText(`${FEED}/latest-mac.yml`));    // read again: a retry must not reuse old details
  const entry = info.files.find(f => /\.zip$/.test(f.url));
  if (!entry) throw new Error('The release has no Mac zip.');
  const zip = await download(`${FEED}/${entry.url}`, work(entry.url), entry.sha512, percent => set({ percent }));
  set({ phase: 'installing', percent: 100 });
  const unpack = work('unpacked');
  fs.rmSync(unpack, { recursive: true, force: true });
  fs.mkdirSync(unpack, { recursive: true });
  await run('/usr/bin/ditto', ['-x', '-k', zip, unpack]);
  const fresh = fs.readdirSync(unpack).map(n => path.join(unpack, n)).find(p => p.endsWith('.app'));
  if (!fresh || !fs.existsSync(path.join(fresh, 'Contents', 'Info.plist'))) throw new Error('The update did not contain the app.');
  try { await run('/usr/bin/xattr', ['-dr', 'com.apple.quarantine', fresh]); } catch { /* nothing to remove */ }
  // Swap: the old app goes next to the download (same disk, so it is a rename), the new one takes its place.
  const aside = work(`previous-${Date.now()}.app`);
  fs.renameSync(bundle, aside);
  try { fs.renameSync(fresh, bundle); } catch (err) {
    try { await run('/usr/bin/ditto', [fresh, bundle]); } catch { fs.renameSync(aside, bundle); throw err; }
  }
  try { fs.unlinkSync(zip); } catch { /* fine */ }
  app.relaunch({ execPath: path.join(bundle, 'Contents', 'MacOS', path.basename(process.execPath)) });
  app.exit(0);
}

/* ---------- start ---------- */

/** Starts checking: now (a few seconds after the window opens), then every few hours. `send` reaches every window. */
function start(send) {
  broadcast = send;
  // Leftovers of the last update: the portable exe moved aside, the old Mac app, the download folder.
  try { if (process.env.PORTABLE_EXECUTABLE_FILE) fs.unlinkSync(`${process.env.PORTABLE_EXECUTABLE_FILE}.old`); } catch { /* none */ }
  try { fs.rmSync(path.join(app.getPath('userData'), 'update'), { recursive: true, force: true }); } catch { /* none */ }
  if (route() === 'off') return;
  setTimeout(check, 4000);
  setInterval(check, EVERY).unref();
}

module.exports = { start, check, update, current: () => state, route, PAGE };
