// template/src/main.ts

if (typeof window !== 'undefined' && window.__STANDALONE_REMOTE__ === true) {
  import('./bootstrap').then(m => m.bootstrapRemote());
}

// Khi load từ shell (MF), remote KHÔNG bootstrap gì cả.
