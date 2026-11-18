'use strict';
// Builds and runs code with the compilers installed on this computer.
//
// The website normally sends code to Compiler Explorer. In the app, with "Use this computer's compilers" switched on
// (Settings, Desktop app), a page hands the same job to this file instead: the files of a program, the compiler's
// options, and what to type into it. The program is built in a fresh folder inside the temp folder, run with a time
// limit, and the folder is removed again.
//
// A program started this way is an ordinary program on this computer. It can read and change files like anything
// else its owner runs. That is why the switch is off until they turn it on, and why main.js asks in a window of its
// own, which a page cannot click.
//
// Finding the compilers (detect) is done the same careful way on Windows, macOS and Linux:
//   1. look everywhere a compiler usually lives, not only on the PATH (an app started from the Dock or a launcher
//      does not get the shell's PATH, so the login shell is asked for it too);
//   2. ask every candidate for its version and keep the newest that is new enough for the courses;
//   3. build and run a three-line program with it. A compiler that cannot do that (no linker, missing headers,
//      half an install) is not offered, and the site goes on using the online compiler for that language.
// Step 3 is remembered per compiler (its path, version and date), so it costs time once, not at every start.
//
// The job has the shape of a Compiler Explorer request (app/js/local/compiler.js makes both), and the files are
// named the way that service names them, so the same code reads the compiler's messages either way.
//
// Nothing here needs Electron: tools/runner-selftest.js runs it under plain Node on all three systems.
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const WIN = process.platform === 'win32', MAC = process.platform === 'darwin';
const EXE = WIN ? '.exe' : '';
const BUILD_MS = 90000;            // a first build with a cold disk can be slow
const RUN_MS = 10000;              // the same patience Compiler Explorer has
const MAX_OUT = 1024 * 1024;
const MAX_FILES = 200, MAX_BYTES = 8 * 1024 * 1024;
const SOURCE = { cpp: 'example.cpp', python: 'example.py', rust: 'example.rs', java: 'example.java', csharp: 'example.cs' };
const HOME = os.homedir();

/* ---------- starting a program and waiting for it ---------- */

function killTree(child) {
  if (!child || child.exitCode !== null || !child.pid) return;
  if (WIN) { try { spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }).on('error', () => {}); } catch { /* already gone */ } }
  else { try { process.kill(-child.pid, 'SIGKILL'); } catch { /* already gone */ } }
  try { child.kill('SIGKILL'); } catch { /* already gone */ }
}

/** Runs a program to its end. Never rejects: a program that cannot start comes back with failed: true. */
function exec(file, args, { cwd, env, stdin = '', timeout = RUN_MS, limit = MAX_OUT, verbatim = false } = {}) {
  return new Promise(resolve => {
    const started = Date.now();
    const out = [], err = [];
    let size = 0, timedOut = false, truncated = false, settled = false, child;
    const finish = (code, failed = false) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const text = chunks => Buffer.concat(chunks).toString('utf8').replace(/\r\n/g, '\n');
      resolve({ code, stdout: text(out), stderr: text(err), timedOut, truncated, failed, ms: Date.now() - started });
    };
    let timer = null;
    try { child = spawn(file, args, { cwd, env, windowsHide: true, detached: !WIN, windowsVerbatimArguments: verbatim }); }
    catch (e) { err.push(Buffer.from(String(e && e.message || e))); return finish(-1, true); }
    timer = setTimeout(() => { timedOut = true; killTree(child); }, timeout);
    const take = list => chunk => {
      if (truncated) return;
      size += chunk.length;
      if (size > limit) { truncated = true; killTree(child); return; }
      list.push(chunk);
    };
    child.stdout.on('data', take(out));
    child.stderr.on('data', take(err));
    child.on('error', e => { err.push(Buffer.from(String(e && e.message || e))); finish(-1, true); });
    child.on('close', (code, signal) => finish(code !== null ? code : 128 + ((os.constants.signals || {})[signal] || 0)));
    child.stdin.on('error', () => { /* it ended before reading everything */ });
    child.stdin.end(stdin);
  });
}

/* ---------- where programs live ---------- */

const pathKey = env => Object.keys(env).find(k => k.toUpperCase() === 'PATH') || 'PATH';
const pathDirs = env => String(env[pathKey(env)] || '').split(path.delimiter).filter(Boolean);
const withPath = (env, dir) => { const next = { ...env }; const key = pathKey(next); next[key] = dir + path.delimiter + (next[key] || ''); return next; };

/** Is there a program at this path? A program from the Microsoft Store (Python, say) is a link that can be started but not looked at. */
function isProgram(file) {
  try { return fs.statSync(file).isFile(); } catch {
    try { return !fs.lstatSync(file).isDirectory(); } catch { return false; }
  }
}

/** Every existing path a pattern names. A * stands for any run of characters inside one folder or file name. */
function expand(pattern) {
  if (!path.isAbsolute(String(pattern))) return [];        // made from a setting this computer does not have
  const parts = String(pattern).split(/[\\/]+/);
  let found = [parts[0] === '' ? path.sep : parts[0] + (WIN && /^[A-Za-z]:$/.test(parts[0]) ? path.sep : '')];
  for (const part of parts.slice(1)) {
    if (!part) continue;
    const next = [];
    for (const dir of found) {
      if (!part.includes('*')) { next.push(path.join(dir, part)); continue; }
      const re = new RegExp('^' + part.split('*').map(s => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$', WIN ? 'i' : '');
      try { for (const name of fs.readdirSync(dir)) if (re.test(name)) next.push(path.join(dir, name)); } catch { /* no such folder */ }
    }
    found = next.slice(0, 200);
  }
  return found.filter(p => fs.existsSync(p) || isProgram(p));
}

/** Programs called `name` (or matching a pattern of names) in these folders, in order, each once. */
function programs(dirs, names) {
  const seen = new Set(), out = [];
  for (const dir of dirs) {
    for (const name of names) {
      const list = name instanceof RegExp
        ? (() => { try { return fs.readdirSync(dir).filter(n => name.test(WIN ? n.replace(/\.exe$/i, '') : n) && (!WIN || /\.exe$/i.test(n))).map(n => path.join(dir, n)); } catch { return []; } })()
        : [path.join(dir, name + EXE)];
      for (const file of list) {
        if (!isProgram(file)) continue;
        let key = file;
        try { key = fs.realpathSync(file); } catch { /* a link that cannot be followed: its own name will do */ }
        if (WIN) key = key.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(file);
      }
    }
  }
  return out.slice(0, 16);
}

const env_ = name => process.env[name] || '';
const dirsOf = patterns => patterns.filter(Boolean).flatMap(expand);

/**
 * What the login shell would give a program: its PATH above all, and where Java and .NET were said to be.
 * A Mac or Linux app opened from the Dock, Finder or a launcher gets a bare PATH (/usr/bin:/bin), with none of
 * Homebrew, rustup, pyenv, asdf or sdkman on it. The shell is asked once, and given a few seconds.
 */
async function shellEnv() {
  if (WIN) return {};
  const shell = env_('SHELL') || (MAC ? '/bin/zsh' : '/bin/bash');
  if (!isProgram(shell)) return {};
  const r = await exec(shell, ['-ilc', 'echo __XENON_ENV__; /usr/bin/env; echo __XENON_END__'], { env: { ...process.env, TERM: 'dumb' }, timeout: 6000, limit: 512 * 1024 });
  const body = (/__XENON_ENV__\n([\s\S]*?)__XENON_END__/.exec(r.stdout) || [])[1] || '';
  const out = {};
  for (const line of body.split('\n')) { const m = /^(PATH|JAVA_HOME|DOTNET_ROOT|CARGO_HOME|PYENV_ROOT)=(.*)$/.exec(line); if (m) out[m[1]] = m[2]; }
  return out;
}

/** The environment programs are started with: this app's, the login shell's PATH, and the usual folders. */
async function baseEnv() {
  const env = { ...process.env };
  const fromShell = await shellEnv().catch(() => ({}));
  for (const name of ['JAVA_HOME', 'DOTNET_ROOT', 'CARGO_HOME', 'PYENV_ROOT']) if (!env[name] && fromShell[name]) env[name] = fromShell[name];
  const key = pathKey(env);
  const usual = WIN ? [path.join(HOME, '.cargo', 'bin')]
    : ['/usr/local/bin', '/opt/homebrew/bin', '/opt/local/bin', path.join(HOME, '.cargo', 'bin'), path.join(HOME, '.local', 'bin'), path.join(HOME, '.dotnet'), '/usr/local/share/dotnet', '/usr/share/dotnet', '/usr/lib/dotnet', '/snap/bin'];
  const all = [];
  for (const dir of [...pathDirs(env), ...String(fromShell.PATH || '').split(path.delimiter), ...usual]) if (dir && !all.includes(dir)) all.push(dir);
  env[key] = all.join(path.delimiter);
  delete env.ELECTRON_RUN_AS_NODE;
  return env;
}

// XENON_RUNNER_DEBUG=1 prints what the search looked at and what each candidate answered.
const debug = process.env.XENON_RUNNER_DEBUG ? (...words) => console.error('[runner]', ...words) : () => {};
/** Asks a program a question (its version, mostly). A cold disk or a virus scanner can make the first answer slow. */
async function probe(file, args, env) {
  const r = await exec(file, args, { env, timeout: 25000, limit: 256 * 1024 });
  debug(`${file} ${args.join(' ')} -> code ${r.code}${r.timedOut ? ' (timed out)' : ''} in ${r.ms} ms: ${(r.stdout || r.stderr).split('\n')[0].slice(0, 120)}`);
  return r;
}
/** Runs `look` on every candidate at once and keeps what it returns, in the candidates' order. */
const lookAt = async (list, look) => (await Promise.all(list.map(item => look(item).catch(() => null)))).filter(Boolean);
const numeric = (a, b) => { const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0); return 0; };
const newestFirst = list => list.sort((a, b) => numeric(b.version, a.version));
const stamp = file => { try { return Math.round(fs.statSync(file).mtimeMs); } catch { return 0; } };

/* ---------- the candidates for each language ----------
   Each finder returns every usable install it can see, newest first, and adds a line to `notes` for installs that are
   too old for the courses. Nothing is built yet: that is verify(), below. */

/** Visual Studio's C++ compiler: every edition and year, Build Tools included, the newest first. */
async function findMsvc(env, notes) {
  if (!WIN) return [];
  const installs = [];
  const vswhere = path.join(env_('ProgramFiles(x86)') || 'C:\\Program Files (x86)', 'Microsoft Visual Studio', 'Installer', 'vswhere.exe');
  if (fs.existsSync(vswhere)) {
    const r = await probe(vswhere, ['-all', '-prerelease', '-products', '*', '-format', 'json', '-utf8'], env);
    try { for (const found of JSON.parse(r.stdout)) if (found && found.installationPath) installs.push({ dir: found.installationPath, year: (/\b(20\d\d)\b/.exec(found.displayName || '') || [])[1] || '' }); } catch { /* none it knows of */ }
  }
  // Without the installer's own list (an unusual install), look where Visual Studio puts itself.
  for (const root of [env_('ProgramFiles'), env_('ProgramFiles(x86)')].filter(Boolean)) {
    for (const dir of expand(path.join(root, 'Microsoft Visual Studio', '*', '*'))) {
      if (!installs.some(i => i.dir.toLowerCase() === dir.toLowerCase())) installs.push({ dir, year: (/\\(20\d\d)\\/.exec(dir + '\\') || [])[1] || '' });
    }
  }
  const out = [];
  for (const { dir, year } of installs) {
    const build = path.join(dir, 'VC', 'Auxiliary', 'Build');
    // On an ARM computer the ARM tools are used when they are there; the x64 ones run there too.
    const vcvars = [process.arch === 'arm64' ? 'vcvarsarm64.bat' : '', 'vcvars64.bat'].filter(Boolean).map(n => path.join(build, n)).find(f => fs.existsSync(f));
    if (!vcvars) continue;
    let version = '';
    try { version = (/^(\d+\.\d+)/.exec(fs.readFileSync(path.join(build, 'Microsoft.VCToolsVersion.default.txt'), 'utf8').trim()) || [])[1] || ''; } catch { /* read from the folder instead */ }
    if (!version) version = expand(path.join(dir, 'VC', 'Tools', 'MSVC', '*')).map(p => (/^(\d+\.\d+)/.exec(path.basename(p)) || [])[1]).filter(Boolean).sort(numeric).pop() || '';
    if (!version) continue;          // Visual Studio without the C++ workload
    const name = `MSVC ${version}${year ? ` (Visual Studio ${year})` : ''}`;
    if (numeric(version, '14.30') < 0) { notes.push(`${name} is too old for the C++ course, which needs Visual Studio 2022 or newer.`); continue; }
    out.push({ id: 'msvc', kind: 'msvc', name, version, vcvars, file: vcvars, env: null });
  }
  return newestFirst(out);
}

/** Visual Studio's compiler needs a long list of settings that one of its own scripts makes. It is run once. */
function msvcEnv(tool, env) {
  tool.env ||= (async () => {
    const r = await exec(env_('ComSpec') || 'cmd.exe', ['/d', '/s', '/c', `"chcp 65001>nul & "${tool.vcvars}" >nul 2>&1 && set"`],
      { env: { ...env, VSCMD_SKIP_SENDTELEMETRY: '1' }, timeout: 60000, verbatim: true });
    const made = {};
    for (const line of r.stdout.split('\n')) { const at = line.indexOf('='); if (at > 0) made[line.slice(0, at)] = line.slice(at + 1); }
    const cl = programs(pathDirs(made), ['cl'])[0];
    if (!cl || !made.INCLUDE) throw new Error('Visual Studio is installed, but its C++ compiler could not be set up.');
    return { env: { ...made, VSLANG: '1033' }, cl };
  })();
  tool.env.catch(() => { tool.env = null; });      // tried again at the next build
  return tool.env;
}

let appleTools = null;
/** Without Apple's command line tools, the compilers in /usr/bin only open a window asking to install them. */
const hasAppleTools = env => (appleTools ||= MAC ? probe('/usr/bin/xcode-select', ['-p'], env).then(r => r.code === 0 && fs.existsSync(r.stdout.trim())) : Promise.resolve(true));
const appleStub = async (file, env) => MAC && file.startsWith('/usr/bin/') && !(await hasAppleTools(env));

/** GCC and Clang, under every name they are installed as (g++, g++-14, clang++-18...), in every usual place. */
async function findGnu(env, notes) {
  const dirs = [...pathDirs(env), ...dirsOf(WIN
    ? ['C:\\msys64\\ucrt64\\bin', 'C:\\msys64\\mingw64\\bin', 'C:\\msys64\\clang64\\bin', 'C:\\mingw64\\bin', 'C:\\winlibs\\mingw64\\bin', 'C:\\TDM-GCC-64\\bin', 'C:\\ProgramData\\mingw64\\mingw64\\bin',
      path.join(HOME, 'scoop', 'apps', 'gcc', 'current', 'bin'), path.join(HOME, 'scoop', 'apps', 'mingw*', 'current', 'bin'), path.join(HOME, 'scoop', 'shims'), 'C:\\ProgramData\\chocolatey\\bin',
      path.join(env_('LOCALAPPDATA'), 'Microsoft', 'WinGet', 'Links'), 'C:\\MinGW\\bin']
    : ['/opt/homebrew/opt/llvm/bin', '/usr/local/opt/llvm/bin', '/opt/homebrew/opt/gcc/bin', '/usr/local/opt/gcc/bin', '/usr/lib/llvm-*/bin'])];
  const found = { 'g++': [], 'clang++': [] }, old = { 'g++': '', 'clang++': '' };
  const files = programs(dirs, ['g++', 'clang++', /^g\+\+-(mp-)?\d+(\.\d+)?$/, /^clang\+\+-(mp-)?\d+(\.\d+)?$/]);
  debug('C++ candidates:', files.join(', ') || 'none');
  for (const tool of await lookAt(files, async file => {
    if (await appleStub(file, env)) return null;
    const r = await probe(file, ['--version'], env);
    const banner = r.stdout || r.stderr;
    const first = banner.split('\n')[0] || '';
    if (r.code !== 0 || !first) return null;
    const clang = /clang/i.test(first), apple = /Apple/.test(first);
    // Clang on Windows is only usable here in its MinGW form; the other form needs Visual Studio's libraries.
    if (WIN && clang && !/Target:.*(mingw|windows-gnu)/i.test(banner)) return null;
    const all = [...first.matchAll(/(\d+)\.(\d+)(?:\.(\d+))?/g)];
    const v = clang ? /version (\d+)\.(\d+)(?:\.(\d+))?/.exec(first) : all[all.length - 1];
    if (!v) return null;
    const major = Number(v[1]);
    const id = clang ? 'clang++' : 'g++';
    const name = `${clang ? (apple ? 'Apple Clang' : 'Clang') : 'GCC'} ${v[1]}.${v[2]}`;
    if (clang ? major < 14 : major < 11) { old[id] ||= name; return null; }
    // The newest standard the compiler knows a name for. verify() tries the next one down if this is refused.
    const std = clang ? ((apple ? major >= 16 : major >= 17) ? ['c++23', 'c++2b'] : ['c++2b']) : ['c++23', 'c++2b'];
    return { id, kind: 'gnu', name, version: `${v[1]}.${v[2]}.${v[3] || 0}`, file, std: std[0], stds: std };
  })) found[tool.id].push(tool);
  for (const id of ['g++', 'clang++']) if (!found[id].length && old[id]) notes.push(`${old[id]} is too old for the C++ course, which needs C++23.`);
  return { gcc: newestFirst(found['g++']), clang: newestFirst(found['clang++']) };
}

async function findPython(env, notes) {
  const dirs = [...pathDirs(env), ...dirsOf(WIN
    ? [path.join(env_('LOCALAPPDATA'), 'Programs', 'Python', 'Python3*'), 'C:\\Python3*', path.join(env_('ProgramFiles'), 'Python3*'), path.join(env_('LOCALAPPDATA'), 'Microsoft', 'WindowsApps'),
      path.join(HOME, 'miniconda3'), path.join(HOME, 'anaconda3'), path.join(HOME, 'scoop', 'apps', 'python', 'current'), path.join(HOME, '.pyenv', 'pyenv-win', 'shims')]
    : ['/Library/Frameworks/Python.framework/Versions/3.*/bin', path.join(env.PYENV_ROOT || path.join(HOME, '.pyenv'), 'shims'), path.join(HOME, '.asdf', 'shims'), path.join(HOME, 'miniconda3', 'bin'), path.join(HOME, 'anaconda3', 'bin'), '/opt/homebrew/opt/python*/bin', '/usr/local/opt/python*/bin'])];
  const candidates = programs(dirs, WIN ? ['python', 'python3'] : ['python3', /^python3\.\d+$/, 'python']).map(file => ({ file, pre: [] }));
  if (WIN) for (const file of programs([...pathDirs(env), env_('SystemRoot')], ['py'])) candidates.push({ file, pre: ['-3'] });      // the launcher picks the newest installed
  let old = '';
  debug('Python candidates:', candidates.map(c => c.file).join(', ') || 'none');
  const found = await lookAt(candidates, async ({ file, pre }) => {
    if (await appleStub(file, env)) return null;
    const r = await probe(file, [...pre, '--version'], env);
    const v = /^Python (\d+)\.(\d+)(?:\.(\d+))?/.exec((r.stdout || r.stderr).trim());      // the Windows Store stand-in prints something else
    if (!v) return null;
    if (Number(v[1]) !== 3 || Number(v[2]) < 10) { old ||= `Python ${v[1]}.${v[2]}`; return null; }
    return { name: `Python ${v[1]}.${v[2]}`, version: `${v[1]}.${v[2]}.${v[3] || 0}`, file, pre };
  });
  if (!found.length && old) notes.push(`${old} is too old for the Python course, which needs 3.10 or newer.`);
  return newestFirst(found);
}

async function findRust(env, notes) {
  const dirs = [...pathDirs(env), ...dirsOf([path.join(env.CARGO_HOME || path.join(HOME, '.cargo'), 'bin'), path.join(HOME, '.asdf', 'shims'), ...(WIN ? [path.join(HOME, 'scoop', 'shims')] : ['/opt/homebrew/opt/rust/bin', '/usr/local/opt/rust/bin'])])];
  let old = '';
  const files = programs(dirs, ['rustc']);
  debug('Rust candidates:', files.join(', ') || 'none');
  const found = await lookAt(files, async file => {
    const v = /rustc (\d+)\.(\d+)(?:\.(\d+))?/.exec((await probe(file, ['--version'], env)).stdout);
    if (!v) return null;
    if (Number(v[1]) === 1 && Number(v[2]) < 85) { old ||= `Rust ${v[1]}.${v[2]}`; return null; }
    return { name: `Rust ${v[1]}.${v[2]}`, version: `${v[1]}.${v[2]}.${v[3] || 0}`, file };
  });
  if (!found.length && old) notes.push(`${old} is too old for the Rust course, which needs 1.85 or newer (run: rustup update).`);
  return newestFirst(found);
}

async function findJava(env, notes) {
  const homes = [env.JAVA_HOME || ''];
  if (MAC) {
    // macOS knows its own JDKs. (The java and javac in /usr/bin are stand-ins that ask to install one, so they are never started.)
    const r = await probe('/usr/libexec/java_home', [], env);
    if (r.code === 0 && r.stdout.trim()) homes.push(r.stdout.trim());
    homes.push(...dirsOf(['/Library/Java/JavaVirtualMachines/*/Contents/Home', path.join(HOME, 'Library', 'Java', 'JavaVirtualMachines', '*', 'Contents', 'Home'), '/opt/homebrew/opt/openjdk*', '/usr/local/opt/openjdk*', '/opt/homebrew/opt/openjdk*/libexec/openjdk.jdk/Contents/Home']));
  } else if (WIN) {
    for (const root of [env_('ProgramFiles'), env_('ProgramFiles(x86)')].filter(Boolean)) {
      homes.push(...dirsOf(['Java', 'Eclipse Adoptium', 'Microsoft', 'Zulu', 'Amazon Corretto', 'BellSoft', 'OpenJDK', 'RedHat', 'Semeru'].map(vendor => path.join(root, vendor, '*'))));
    }
    homes.push(...dirsOf([path.join(HOME, '.jdks', '*'), path.join(HOME, 'scoop', 'apps', '*jdk*', 'current')]));
  } else {
    homes.push(...dirsOf(['/usr/lib/jvm/*', '/usr/lib64/jvm/*', '/usr/java/*', '/opt/java/*', '/opt/jdk*', path.join(HOME, '.jdks', '*')]));
  }
  homes.push(...dirsOf([path.join(HOME, '.sdkman', 'candidates', 'java', '*'), path.join(HOME, '.asdf', 'installs', 'java', '*')]));
  const dirs = [...homes.filter(Boolean).map(home => path.join(home, 'bin')), ...pathDirs(env)];
  let old = '';
  const files = programs(dirs, ['javac']);
  debug('Java candidates:', files.join(', ') || 'none');
  const found = await lookAt(files, async javac => {
    if (MAC && javac.startsWith('/usr/bin/')) return null;
    const java = path.join(path.dirname(javac), 'java' + EXE);
    if (!isProgram(java)) return null;
    const r = await probe(javac, ['-version'], env);
    const v = /javac (\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(r.stdout || r.stderr);
    if (!v) return null;
    if (Number(v[1]) < 25) { if (!old || Number(v[1]) > Number(old)) old = v[1]; return null; }
    return { name: `Java ${v[1]}`, version: `${v[1]}.${v[2] || 0}.${v[3] || 0}`, file: javac, javac, java };
  });
  if (!found.length && old) notes.push(`Java ${old} is older than the Java course needs (25 or newer).`);
  return newestFirst(found);
}

async function findCSharp(env, notes) {
  const dirs = [env.DOTNET_ROOT || '', ...pathDirs(env), ...dirsOf(WIN
    ? [path.join(env_('ProgramFiles'), 'dotnet'), path.join(env_('LOCALAPPDATA'), 'Microsoft', 'dotnet'), path.join(HOME, '.dotnet')]
    : ['/usr/local/share/dotnet', '/usr/share/dotnet', '/usr/lib/dotnet', '/usr/lib64/dotnet', path.join(HOME, '.dotnet'), '/opt/homebrew/opt/dotnet/libexec', '/usr/local/opt/dotnet/libexec', '/snap/dotnet-sdk/current'])].filter(Boolean);
  const found = [];
  let old = 0;
  debug('.NET candidates:', programs(dirs, ['dotnet']).join(', ') || 'none');
  for (const dotnet of programs(dirs, ['dotnet'])) {
    const sdks = [...(await probe(dotnet, ['--list-sdks'], env)).stdout.matchAll(/^(\d+\.\d+\.\d+)\S*\s+\[(.+)\]\s*$/gm)].map(m => ({ version: m[1], dir: m[2] }))
      .filter(s => fs.existsSync(path.join(s.dir, s.version, 'Roslyn', 'bincore', 'csc.dll'))).sort((a, b) => numeric(b.version, a.version));
    if (!sdks.length) continue;
    const runtimes = [...(await probe(dotnet, ['--list-runtimes'], env)).stdout.matchAll(/^Microsoft\.NETCore\.App (\d+\.\d+\.\d+)/gm)].map(m => m[1]);
    for (const sdk of sdks) {
      const major = Number(sdk.version.split('.')[0]);
      if (major < 9) { old = Math.max(old, major); continue; }
      // The compiler needs the list of what .NET itself offers (the reference pack) and a runtime of the same year to start the program.
      const packs = path.join(path.dirname(sdk.dir), 'packs', 'Microsoft.NETCore.App.Ref');
      let pack = '';
      try { pack = fs.readdirSync(packs).filter(v => Number(v.split('.')[0]) === major).sort(numeric).pop() || ''; } catch { /* no reference pack */ }
      const refs = pack ? path.join(packs, pack, 'ref', `net${major}.0`) : '';
      const runtime = runtimes.filter(v => Number(v.split('.')[0]) === major).sort(numeric).pop();
      if (!refs || !fs.existsSync(refs) || !runtime) continue;
      found.push({ name: `.NET ${major} (C# 13)`, version: sdk.version, file: dotnet, dotnet, csc: path.join(sdk.dir, sdk.version, 'Roslyn', 'bincore', 'csc.dll'), refs, tfm: `net${major}.0`, runtime });
      break;
    }
  }
  if (!found.length && old) notes.push(`.NET ${old} is older than the C# course needs (.NET 9 or newer).`);
  return newestFirst(found);
}

/* ---------- one build and run, with a compiler already chosen ---------- */

const NAME = /^[A-Za-z0-9_][A-Za-z0-9_.+ -]{0,80}$/;
const RESERVED = /^(con|prn|aux|nul|com\d|lpt\d)(\..*)?$/i;
function safePath(name) {
  const parts = String(name || '').split('/');
  return parts.length <= 6 && parts.every(p => NAME.test(p) && !/[. ]$/.test(p) && !RESERVED.test(p)) ? parts : null;
}

const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Takes the temp folder's path out of what a compiler or a program printed: the page shows the project's own names. */
function scrubber(dir) {
  const forms = new Set();
  for (const d of [dir, (() => { try { return fs.realpathSync.native(dir); } catch { return dir; } })()]) { forms.add(d); forms.add(d.replace(/\\/g, '/')); forms.add(d.replace(/\\/g, '\\\\')); }
  const re = new RegExp(`(?:\\\\\\\\\\?\\\\)?(?:${[...forms].sort((a, b) => b.length - a.length).map(escapeRe).join('|')})(?:\\\\\\\\|[\\\\/])?`, WIN ? 'gi' : 'g');
  return text => String(text || '').replace(re, '');
}

/** The class of a Java program that holds main, read from its source. */
function javaMain(texts) {
  for (const code of texts) {
    const re = /(?:^|[\s;{}])(?:class|record|enum|interface)\s+(\w+)[^{;]*\{/g;
    let m;
    while ((m = re.exec(code))) {
      let depth = 1, i = re.lastIndex;
      for (; i < code.length && depth; i++) { if (code[i] === '{') depth++; else if (code[i] === '}') depth--; }
      if (/\bvoid\s+main\s*\(/.test(code.slice(re.lastIndex, i))) return m[1];
    }
  }
  return /^\s*(?:static\s+)?void\s+main\s*\(/m.test(texts[0] || '') ? 'example' : 'Main';      // a main with no class around it belongs to the file
}

const UTF8_CS = 'static class XenonUtf8 { [System.Runtime.CompilerServices.ModuleInitializer] internal static void Init() { try { System.Console.OutputEncoding = new System.Text.UTF8Encoding(false); } catch { } try { System.Console.InputEncoding = new System.Text.UTF8Encoding(false); } catch { } } }\n';

/**
 * Builds the files of `job` with `tool` and, when asked, runs the program.
 * Resolves with { build: { code, stdout, stderr, failed }, run: {...} | null }.
 */
async function build(lang, tool, env, job) {
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'xenon-run-'));
  const scrub = scrubber(dir);
  try {
    for (const f of job.files) {
      const file = path.join(dir, ...f.parts);
      if (f.parts.length > 1) await fs.promises.mkdir(path.dirname(file), { recursive: true });
      await fs.promises.writeFile(file, f.text);
    }
    await fs.promises.writeFile(path.join(dir, SOURCE[lang]), job.source);

    const { flags, args } = job;
    const compile = (file, list, extra) => exec(file, list, { cwd: dir, env: { ...env, ...extra }, timeout: BUILD_MS });
    const english = { LANGUAGE: 'en_US:en' };
    let made = { code: 0, stdout: '', stderr: '' };
    let program = null;       // { file, args, env }

    if (lang === 'cpp' && tool.kind === 'msvc') {
      const vs = await msvcEnv(tool, env);
      const check = flags.includes('/Zs');
      made = await exec(vs.cl, ['/nologo', ...flags, SOURCE.cpp, ...(check ? [] : ['/Feprog.exe'])], { cwd: dir, env: vs.env, timeout: BUILD_MS });
      if (!check) program = { file: path.join(dir, 'prog.exe'), args, env };
    } else if (lang === 'cpp') {
      const check = flags.includes('-fsyntax-only');
      made = await compile(tool.file, [...flags.map(f => (f === '-std=c++23' ? `-std=${tool.std}` : f)), SOURCE.cpp, ...(check ? [] : ['-o', 'prog' + EXE])], english);
      // A MinGW program needs the compiler's own libraries beside it when it starts.
      if (!check) program = { file: path.join(dir, 'prog' + EXE), args, env: withPath(env, path.dirname(tool.file)) };
    } else if (lang === 'python') {
      program = { file: tool.file, args: [...tool.pre, SOURCE.python, ...args], env: { ...env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8', PYTHONDONTWRITEBYTECODE: '1' } };
    } else if (lang === 'rust') {
      // A check without a run builds a library, as Compiler Explorer does: nothing is linked.
      made = await compile(tool.file, job.execute ? [...flags, SOURCE.rust, '-o', 'prog' + EXE] : [...flags, '--crate-type', 'lib', '--emit', 'metadata', SOURCE.rust], {});
      if (job.execute) program = { file: path.join(dir, 'prog' + EXE), args, env };
    } else if (lang === 'java') {
      const others = job.files.filter(f => f.parts.length === 1 && /\.java$/i.test(f.parts[0]));
      made = await compile(tool.javac, ['-J-Duser.language=en', '-encoding', 'UTF-8', '-d', '.', ...flags, SOURCE.java, ...others.map(f => f.parts[0])], {});
      program = { file: tool.java, args: ['-Duser.language=en', '-Dfile.encoding=UTF-8', '-Dstdout.encoding=UTF-8', '-Dstderr.encoding=UTF-8', '-cp', '.', javaMain([job.source, ...others.map(f => f.text)]), ...args], env };
    } else if (lang === 'csharp') {
      const quiet = { DOTNET_NOLOGO: '1', DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_CLI_UI_LANGUAGE: 'en' };
      const refs = (await fs.promises.readdir(tool.refs)).filter(n => /\.dll$/i.test(n)).map(n => `-r:"${path.join(tool.refs, n)}"`);
      await fs.promises.writeFile(path.join(dir, 'xenon_refs.rsp'), refs.join('\n'));
      await fs.promises.writeFile(path.join(dir, 'XenonUtf8.cs'), UTF8_CS);
      made = await compile(tool.dotnet, [tool.csc, '-nologo', '-preferreduilang:en', '-langversion:13.0', '-nullable:enable', '-unsafe+', '-debug-', '-target:exe', '-out:xenon.dll', '@xenon_refs.rsp', ...flags, SOURCE.csharp, 'XenonUtf8.cs'], quiet);
      await fs.promises.writeFile(path.join(dir, 'xenon.runtimeconfig.json'), JSON.stringify({ runtimeOptions: { tfm: tool.tfm, framework: { name: 'Microsoft.NETCore.App', version: tool.runtime } } }));
      program = { file: tool.dotnet, args: ['xenon.dll', ...args], env: { ...env, ...quiet } };
    }

    const built = { code: made.timedOut ? 1 : made.code, failed: !!made.failed, stdout: scrub(made.stdout), stderr: scrub(made.stderr) + (made.timedOut ? '\nThe build took too long and was stopped.' : '') };
    if (built.failed || built.code !== 0 || !job.execute || !program) return { build: built, run: null };
    const ran = await exec(program.file, program.args, { cwd: dir, env: program.env, stdin: job.stdin, timeout: RUN_MS });
    return {
      build: built,
      run: {
        started: !ran.failed, code: ran.code, timedOut: ran.timedOut, truncated: ran.truncated, ms: ran.ms,
        stdout: scrub(ran.stdout),
        stderr: scrub(ran.stderr) + (ran.truncated ? '\nStopped: the program printed more than 1 MB. Is a loop running for ever?' : ''),
      },
    };
  } finally {
    fs.promises.rm(dir, { recursive: true, force: true, maxRetries: 6, retryDelay: 150 }).catch(() => {});
  }
}

/* ---------- proving a compiler works ---------- */

const HELLO = {
  cpp: { source: '#include <iostream>\n#include <string>\n#include <vector>\nint main()\n{\n    std::vector<std::string> words{ "xenon" };\n    std::cout << words.front() << \'\\n\';\n    return 0;\n}\n' },
  python: { source: 'print("xenon")\n' },
  rust: { source: 'fn main() {\n    println!("xenon");\n}\n', flags: ['--edition', '2024'] },
  java: { source: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("xenon");\n    }\n}\n' },
  csharp: { source: 'System.Console.WriteLine("xenon");\n' },
};

/** Builds and runs a few lines with this compiler. Resolves with '' when it works, or a short reason when it does not. */
async function verify(lang, tool, env) {
  const flagSets = lang !== 'cpp' ? [HELLO[lang].flags || []] : tool.kind === 'msvc' ? [['/std:c++latest', '/EHsc', '/Od', '/MTd']] : tool.stds.map(std => [`-std=${std}`, '-pthread']);
  let why = '';
  for (const flags of flagSets) {
    if (lang === 'cpp' && tool.kind === 'gnu') tool.std = flags[0].slice(5);
    let res;
    try { res = await build(lang, tool, env, { source: HELLO[lang].source, flags: flags.map(f => (f.startsWith('-std=') ? '-std=c++23' : f)), files: [], args: [], stdin: '', execute: true }); }
    catch (err) { return String((err && err.message) || err).slice(0, 200); }
    if (res.run && res.run.started && res.run.code === 0 && res.run.stdout.trim() === 'xenon') return '';
    const said = (res.build.stderr || res.build.stdout || (res.run && res.run.stderr) || '').trim().split('\n').find(l => /error|fatal|not found|cannot|no such/i.test(l)) || '';
    why = res.build.failed ? 'it could not be started' : res.build.code !== 0 ? `it could not build a test program${said ? ` (${said.trim().slice(0, 140)})` : ''}` : 'the test program it built did not run';
  }
  return why;
}

/* ---------- the whole search ---------- */

let scanned = null;

/**
 * opts.checked: what earlier searches proved, { key: { ok, why } }, and opts.remember(checked) to keep it.
 * opts.force: prove everything again.
 */
async function scan(opts = {}) {
  const env = await baseEnv();
  const notes = [];
  const quiet = (p, empty) => p.catch(() => empty);
  const [msvc, gnu, python, rust, java, csharp] = await Promise.all([
    quiet(findMsvc(env, notes), []), quiet(findGnu(env, notes), { gcc: [], clang: [] }), quiet(findPython(env, notes), []),
    quiet(findRust(env, notes), []), quiet(findJava(env, notes), []), quiet(findCSharp(env, notes), [])]);
  const checked = { ...(opts.checked || {}) };
  const used = {};
  /** The first candidate that proves it can build and run something. */
  const firstWorking = async (lang, list) => {
    for (const tool of list.slice(0, 4)) {
      const key = `${lang}|${tool.file}|${tool.version}|${stamp(tool.file)}`;
      let result = !opts.force && checked[key] && typeof checked[key].ok === 'boolean' ? checked[key] : null;
      debug(`${lang}: ${tool.name} at ${tool.file}${result ? ' (proven earlier)' : ''}`);
      if (result && result.ok && result.std && tool.stds) tool.std = result.std;
      if (!result) {
        const why = await verify(lang, tool, env);
        result = { ok: !why, why, ...(tool.stds ? { std: tool.std } : {}) };
        debug(`${lang}: ${tool.name} ${why ? `failed: ${why}` : 'works'}`);
      }
      used[key] = result;
      if (result.ok) return tool;
      notes.push(`${tool.name} is installed, but ${result.why || 'it did not work'}. The online compiler is used instead.`);
    }
    return null;
  };
  const [vs, gcc, clang, py, rs, jv, cs] = await Promise.all([
    firstWorking('cpp', msvc), firstWorking('cpp', gnu.gcc), firstWorking('cpp', gnu.clang),
    firstWorking('python', python), firstWorking('rust', rust), firstWorking('java', java), firstWorking('csharp', csharp)]);
  if (typeof opts.remember === 'function') { try { opts.remember(used); } catch { /* only a cache */ } }
  // The order is the order of preference when the learner has not chosen: the system's own compiler first.
  const cpp = (WIN ? [vs, gcc, clang] : MAC ? [clang, gcc] : [gcc, clang]).filter(Boolean);
  return { env, notes: [...new Set(notes)], cpp, python: py, rust: rs, java: jv, csharp: cs };
}

/** What is installed and proven to work, as the page may know it: names, never paths. */
async function detect(opts = {}) {
  if (opts.force || !scanned) scanned = scan(opts);
  const found = await scanned;
  const tools = {};
  if (found.cpp.length) tools.cpp = found.cpp.map(t => ({ id: t.id, kind: t.kind, name: t.name }));
  for (const lang of ['python', 'rust', 'java', 'csharp']) if (found[lang]) tools[lang] = { name: found[lang].name };
  return { tools, notes: found.notes.slice(0, 10), windows: WIN, platform: process.platform };
}

/* ---------- one job from a page ---------- */

/**
 * job: { lang, tool, source, flags: [..], files: [{ filename, contents }], execute, stdin, args: [..] }
 * Resolves with { build: { code, stdout, stderr }, run: { code, stdout, stderr, timedOut, truncated, ms } | null },
 * or { error } when the job itself is not acceptable. `unavailable: true` beside the error means the compiler is
 * not there (any more): the page then sends the build to the online compiler instead.
 */
async function run(job) {
  if (!job || typeof job !== 'object') return { error: 'Not a job.' };
  const lang = String(job.lang || '');
  if (!SOURCE[lang]) return { error: `This computer cannot build ${lang || 'that'}.`, unavailable: true };
  if (!scanned) scanned = scan();
  const found = await scanned;
  const tool = lang === 'cpp' ? found.cpp.find(t => t.id === job.tool) || found.cpp[0] : found[lang];
  if (!tool) return { error: 'The compiler for this language is not on this computer.', unavailable: true };

  const flags = (Array.isArray(job.flags) ? job.flags : []).slice(0, 80).map(String).filter(f => f && f.length < 400 && !/[\0\r\n]/.test(f));
  const args = (Array.isArray(job.args) ? job.args : []).slice(0, 40).map(String).filter(a => a.length < 2000 && !a.includes('\0'));
  const stdin = String(job.stdin || '').slice(0, MAX_OUT);
  const files = [];
  let bytes = 0;
  for (const f of (Array.isArray(job.files) ? job.files : []).slice(0, MAX_FILES + 1)) {
    const parts = safePath(f && f.filename);
    if (!parts) return { error: `A file named "${String(f && f.filename).slice(0, 60)}" cannot be built on this computer. Use letters, digits, _ . - and spaces in file names.` };
    if (parts.join('/').toLowerCase() === SOURCE[lang]) return { error: `Rename ${parts.join('/')}: that name is taken by the build itself.` };
    const text = String(f.contents === undefined || f.contents === null ? '' : f.contents);
    bytes += Buffer.byteLength(text);
    files.push({ parts, text });
  }
  const source = String(job.source || '');
  bytes += Buffer.byteLength(source);
  if (files.length > MAX_FILES || bytes > MAX_BYTES) return { error: 'This project is too large to build here.' };

  let res;
  try { res = await build(lang, tool, found.env, { source, flags, files, args, stdin, execute: !!job.execute }); }
  catch (err) {
    scanned = null;        // Visual Studio could not be set up, or the temp folder is gone: look again next time
    return { error: String((err && err.message) || err).slice(0, 400), unavailable: true };
  }
  if (res.build.failed) {
    scanned = null;        // the compiler was there when it was found and is not now (uninstalled, a drive unplugged)
    return { error: `${tool.name} could not be started.`, unavailable: true };
  }
  return res;
}

module.exports = { detect, run };
