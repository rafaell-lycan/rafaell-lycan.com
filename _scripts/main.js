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

window.addEventListener('load', () => {
  setWebFontLoader();
  checkExternalLinks();
  startProgressBar();
}, false);