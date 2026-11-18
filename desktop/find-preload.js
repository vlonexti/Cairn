'use strict';
// For the find bar (find.html) only: it can ask for a search and say it is closing.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('findBar', {
  query: (text, forward, again) => ipcRenderer.send('find:query', { text: String(text || ''), forward: forward !== false, again: !!again }),
  close: () => ipcRenderer.send('find:close'),
  onResult: fn => ipcRenderer.on('find:result', (event, result) => fn(result)),
  onFocus: fn => ipcRenderer.on('find:focus', () => fn()),
});
