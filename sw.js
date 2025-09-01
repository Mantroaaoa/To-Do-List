const CACHE_NAME = 'todo-list-v1';
// Daftar file yang akan disimpan di cache. Sesuaikan dengan nama file Anda.
const urlsToCache = [
  '.',
  'index.html',
  'css/style.css',
  'script.js',
  'images/ikon-192.png',
  'images/ikon-512.png'
];

// Saat PWA di-install, simpan file-file di atas ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Setiap kali ada permintaan (fetch), sajikan file dari cache jika ada
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, kembalikan dari cache.
        // Jika tidak, ambil dari jaringan (internet).
        return response || fetch(event.request);
      })
  );
});