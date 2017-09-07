const VERSION='rafaell-cache-v1:1504789855580';

const urlsToCache = [
  '/assets/fonts/Sofia Pro Black Italic.otf',
  '/assets/fonts/Sofia Pro Black.otf',
  '/assets/fonts/Sofia Pro Bold Italic.otf',
  '/assets/fonts/Sofia Pro Bold.otf',
  '/assets/fonts/Sofia Pro Extra Light Italic.otf',
  '/assets/fonts/Sofia Pro Extra Light.otf',
  '/assets/fonts/Sofia Pro Italic.otf',
  '/assets/fonts/Sofia Pro Light Italic.otf',
  '/assets/fonts/Sofia Pro Light.otf',
  '/assets/fonts/Sofia Pro Medium Italic.otf',
  '/assets/fonts/Sofia Pro Medium.otf',
  '/assets/fonts/Sofia Pro Regular.otf',
  '/assets/fonts/Sofia Pro Semi Bold Italic.otf',
  '/assets/fonts/Sofia Pro Semi Bold.otf',
  '/assets/fonts/Sofia Pro Ultra Light Italic.otf',
  '/assets/fonts/Sofia Pro Ultra Light.otf',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-48x48.png',
  '/assets/icons/icon-96x96.png',
  '/assets/images/bg-elements.png',
  '/assets/images/me.jpg',
  '/assets/svgs/bg-elements.svg',

  '/index.html',
  '/manifest.json',
  '/assets/styles/main.css',
  '/assets/scripts/main.bundle.js',

  // TODO: Offline only
  //'/offline',
  //'/assets/images/dead.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
    .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate',event => {
  event.waitUntil(
    caches.keys()
    .then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== VERSION) {
            caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch',event => {
  event.respondWith(
    caches.match(event.request)
      .then( response => {
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});