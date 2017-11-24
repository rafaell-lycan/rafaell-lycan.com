const checkExternalLinks = (d) => {
  let links = d.querySelectorAll('a');

  links.forEach(link => {
    if (link.host != window.location.host) {
      return link.target = "_blank"
    }
  });
}

const startProgressBar = (d) => {
  let bar = d.querySelector('.post__progress');

  if (!bar) return;

  let body = d.body,
      element = d.documentElement,
      st = 'scrollTop',
      sh = 'scrollHeight',
      scroll;

  d.addEventListener('scroll', function() {
    scroll = (element[st]||body[st]) / ((element[sh]||body[sh]) - element.clientHeight) * 100;
    bar.style.setProperty('--progress', scroll + '%');
  });
}

export {checkExternalLinks, startProgressBar};