import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Source Serif Pro','Fira Mono']
  },
  custom: {
    families: ['Sofia Pro:n3,n4,n6,n9,i3,i4,i6,i9'],
    urls: ['/assets/styles/fonts.css']
  },
  active: function() {
    sessionStorage.fonts = true;
  },
  timeout: 1000
});

export default WebFont;