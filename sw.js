self.addEventListener('install', (e) => {
  console.log('Service Worker instalado!');
});

self.addEventListener('fetch', (e) => {
  // Necessário para o navegador considerar o site como PWA
  e.respondWith(fetch(e.request));
});
