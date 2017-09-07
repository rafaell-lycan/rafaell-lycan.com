const init = () => {
  registerServiceWorker();
  loadWebfonds();
};

function loadWebfonds() {
  WebFont.load({
    google: {
      families: [
        'PT Serif',
        'Fira Mono'
      ]
    }
  });
}

function registerServiceWorker() {
  if('serviceWorker'in navigator){
    navigator.serviceWorker.register('/assets/scripts/sw.bundle.js')
      .then(registration => console.log('ServiceWorker magic! ❤️'))
      .catch(err => console.warn('ServiceWorker failed 😔', err));
  }
}

init();