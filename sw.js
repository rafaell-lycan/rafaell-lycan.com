const VERSION='rafaell-cache-v1:1504789855580';

self.importScripts('assets/scripts/lib/sw-toolbox/sw-toolbox.js');
self.importScripts('assets/scripts/lib/sw-offline-google-analytics.js');

const urlsToCache = [
  './assets/fonts/Sofia Pro Black Italic.otf',
  './assets/fonts/Sofia Pro Black.otf',
  './assets/fonts/Sofia Pro Bold Italic.otf',
  './assets/fonts/Sofia Pro Bold.otf',
  './assets/fonts/Sofia Pro Extra Light Italic.otf',
  './assets/fonts/Sofia Pro Extra Light.otf',
  './assets/fonts/Sofia Pro Italic.otf',
  './assets/fonts/Sofia Pro Light Italic.otf',
  './assets/fonts/Sofia Pro Light.otf',
  './assets/fonts/Sofia Pro Medium Italic.otf',
  './assets/fonts/Sofia Pro Medium.otf',
  './assets/fonts/Sofia Pro Regular.otf',
  './assets/fonts/Sofia Pro Semi Bold Italic.otf',
  './assets/fonts/Sofia Pro Semi Bold.otf',
  './assets/fonts/Sofia Pro Ultra Light Italic.otf',
  './assets/fonts/Sofia Pro Ultra Light.otf',
  './assets/icons/icon-128x128.png',
  './assets/icons/icon-144x144.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-48x48.png',
  './assets/icons/icon-96x96.png',
  './assets/images/bg-elements.png',
  './assets/images/me.jpg',
  './assets/svgs/bg-elements.svg',

  './assets/styles/main.css',
  './assets/styles/fonts.css',
  './assets/scripts/main.bundle.js',

  './manifest.json',
  './index.html',
  './404.html',
  './offiline'
];

goog.offlineGoogleAnalytics.initialize();

self.toolbox.precache(urlsToCache);

// self.toolbox.router.get('/*', self.toolbox.networkFirst);

self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if ( response ) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});

self.toolbox.router.get('/(.*)', function(request, values, options) {
  return toolbox
    .fastest(request, values, options)
    .catch(err => {
      if (request.method === 'GET' && request.headers.get('accept').includes('text/html')) {
        return toolbox.cacheOnly(new Request('/offline'), values, options);
      }
      throw err;
    });
});