$(document).ready(function () {



  $(window).scroll(function() {
      if ($(this).scrollTop()) {
          $('#toTop:hidden').stop(true, true).fadeIn();
      } else {
          $('#toTop').stop(true, true).fadeOut();
      }
  });



})

$(document).on('mouseenter','.drink-logo-div',function() {
  $('.drink-logo').hide()
  $('.drink-logo-filled').show()
  $(this).effect("shake", { times:5 }, 750);
})

$(document).on('mouseleave','.drink-logo-div',function() {
  $('.drink-logo-filled').hide()
  $('.drink-logo').show()
})
