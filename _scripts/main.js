const init = () => {
  registerServiceWorker();
  setWebFontLoader();
};

function setWebFontLoader() {
  WebFont.load({
    google: {
      families: ['PT Serif','Fira Mono']
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

window.addEventListener('load', init, false);

/* function startProgress() {
  var h=document.documentElement,
    topBtn=document.querySelector(".header");
    b=document.body,
    st="scrollTop",
    sh="scrollHeight",
    progress=document.querySelector(".progress"),
    scroll;
​
  document.addEventListener("scroll",function(){
    // scroll
    scroll = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    console.log('scroll', scroll, (h[st] || b[st]) , (h[sh] || b[sh]) , h.clientHeight)
​
    progress.style.setProperty("--scroll", scroll + "%");

    if(!topBtn) return;
    var isActive = topBtn.classList.contains("top-active");
    if(window.scrollY >= 1500 && !isActive) {
      return topBtn.classList.add("top-active");
    }


​
    if(topBtn && !topBtn.classList.contains("top-active")
        && window.scrollY >= 1500) {
      topBtn.classList.add("top-active")
    } else if( topBtn && topBtn.classList.contains("top-active")
        && window.scrollY < 1500) {
      topBtn.classList.remove("top-active")
    }
  })
} */

// <div class="progress"></div>

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


