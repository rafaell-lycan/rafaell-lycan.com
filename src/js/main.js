$(function() {
  $('.load').animate({opacity: "1"},1000);
  $('.load-right').each(function(i) {
    $(this).delay((i++) * 200).animate({left:0, opacity:"1"});
  });
});
