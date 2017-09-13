const init = () => {
  // registerServiceWorker();
  setWebFontLoader();
  checkExternalLinks();
  startProgressBar();
};

function setWebFontLoader() {
  WebFont.load({
    google: {
      families: ['Source Serif Pro','Fira Mono']
    },
    custom: {
			families: ['Sofia Pro:n3,n4,n6,n9'],
			urls: ['/assets/styles/fonts.css']
		}
  });
}
function registerServiceWorker() {
  if( 'serviceWorker' in navigator && location.hostname !== 'localhost'){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker magic! ❤️'))
      .catch(err => console.log('Service Worker failed to register 😔', err));
  }
}

function checkExternalLinks(){
  let links = document.querySelectorAll('a');

  links.forEach(link => {
    if (link.host != window.location.host) {
      return link.target = "_blank"
    }
  });
}

function startProgressBar() {
  let bar = document.querySelector('.post__progress');

  if (!bar) return;

  let body = document.body,
      element = document.documentElement,
      st = 'scrollTop',
      sh = 'scrollHeight',
      scroll;

  document.addEventListener('scroll', function() {
    scroll = (element[st]||body[st]) / ((element[sh]||body[sh]) - element.clientHeight) * 100;
    bar.style.setProperty('--progress', scroll + '%');
  });
}

window.addEventListener('load', init, false);

/* function hamburgMenu() {

  document.addEventListener("DOMContentLoaded",function(event){
    var toggleBrowserSupport=document.querySelector("a.toggle_browser_support");
    if(toggleBrowserSupport){
      toggleBrowserSupport.addEventListener("click",function(e){
        e.preventDefault();
        toggleDisplay(toggleBrowserSupport);
        var ciuEmbed=document.querySelector(".ciu_embed");
        ciuEmbed.style.display="block"
      })
    }

    var hamburger=document.querySelector(".toggle-topbar");
    hamburger.addEventListener("click",function(e){
      e.preventDefault();
      document.querySelector(".top-bar").classList.toggle("expanded")
    })
  });
} */


