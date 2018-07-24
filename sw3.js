self.importScripts('/assets/sw-toolbox/sw-toolbox.js');

self.toolbox.precache([
  // Images
  '/assets/images/bg-elements.png',
  '/assets/images/me.jpg',
  '/assets/svgs/bg-elements.svg',
  '/assets/svgs/link.svg',
  '/assets/svgs/logo.svg',

  // Icons
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-48x48.png',
  '/assets/icons/icon-96x96.png',

  // Fonts
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

  // Offline page
  '/offline'
]);

// self.toolbox.router.get('/*', toolbox.networkFirst);

self.toolbox.router.get('/(.*)', function (request, values, options) {
  return toolbox.networkFirst(request, values, options).catch(function (error) {
    if (request.method === 'GET' && request.headers.get('accept').includes('text/html')) {
      return toolbox.cacheOnly(new Request('/offline'), values, options);
    }
    throw error;
  });
});
