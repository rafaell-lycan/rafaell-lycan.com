/*
  ### Rafaell Lycan Website ###
  Document    : main.js
  Author      : Rafaell Lycan
*/
/***
// Variables
var menu = $('.menu');
var body = $('.body');
var time = 500;

// Functions
function init(){

  menu.find('a:not([target]):not([href=#])').on('click', function() {
    changePage(this.href);
    return false;
  });

  menu.transit({opacity: 1}, time).transit({top: 0}, time);
  setTimeout(function(){
    body.transit({opacity: 1}, time);
  }, 500);

}

function changePage(url){

  if(url !== window.location.href){
    menu.transit({top: -75}, time).transit({opacity: 0}, time);
    body.transit({opacity: 0}, time);
    setTimeout(function(){
      window.location.href = url;
    }, time);
  }
}

function activeNav(){
  var pagina = document.getElementsByTagName('body')[0];

  if(window.scrollY >= 200)
    pagina.setAttribute('class','nav-active');
  else
    pagina.removeAttribute('class','nav-active');

}

// Events
$(".divisor a").on("click", function() {
    $('html, body').animate({scrollTop:0}, time * 2);
    return false;
});

$('.job').waypoint(function() {
  $(this).fadeTo((time/2), 1);
}, { offset: '80%' });

$(document).ready(function($) {
  init();

  $('.menu-toggle').on('click', function(e) {
    event.preventDefault();
    $('.menu ul').toggleClass('active');
  });

});
***/

// if(window.location.host.indexOf('rafaell.cc') == 0){
  /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
  var disqus_shortname = 'rafaelllycan'; // required: replace example with your forum shortname
  // var disqus_developer = 1;

  /* * * DON'T EDIT BELOW THIS LINE * * */
    (function () {
        var s = document.createElement('script'); s.async = true;
        s.type = 'text/javascript';
        s.src = '//' + disqus_shortname + '.disqus.com/count.js';
        (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
    }());
// }

function loader(el){
  $(el).fadeOut("slow");
}

jQuery(document).ready(function($) {
  loader('#loader-container');

  $('.menu-toggle').on('click', function(e) {
    event.preventDefault();
    $('.menu ul').toggleClass('active');
  });
});