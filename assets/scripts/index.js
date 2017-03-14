$(document).ready(function () {
  var ctx = document.querySelector("canvas").getContext("2d"),
    dashLen = 220, dashOffset = dashLen, speed = 10,
    txt = "DRINK   MENU", x = 30, i = 0;

  ctx.font = "50px Berkshire Swash, cursive, TSCu_Comic, sans-serif";
  ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.globalAlpha = 0.9;
  ctx.strokeStyle = ctx.fillStyle = "#e4a82f";

  (function loop() {
    ctx.clearRect(x, 0, 60, 150);
    ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
    dashOffset -= speed;                                         // reduce dash length
    ctx.strokeText(txt[i], x, 90);                               // stroke letter

    if (dashOffset > 0) requestAnimationFrame(loop);             // animate
    else {
      ctx.fillText(txt[i], x, 90);                               // fill final letter
      dashOffset = dashLen;                                      // prep next char
      x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
      ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
      ctx.rotate(Math.random() * 0.005);                         // random rotation
      if (i < txt.length) requestAnimationFrame(loop);
    }
  })();

  $('.drink-logo-div').hover(function () {

    if (!$('.drink-logo-div').hasClass('shaking')) {
      $(this).removeClass('show-drink-empty')
      $(this).addClass('show-shaker')
      $(this).addClass('shaking')
      $(this).effect('shake', { times:5 }, 750, function () {
        $(this).removeClass('show-shaker')
        $(this).addClass('show-drink-full')
      })
      $(this).on('mouseleave',function(){
        $(this).stop(true).animate({"right": "40px", "left": "0"}, "slow")
        $(this).removeClass('show-drink-full')
        $(this).removeClass('show-shaker')
        $(this).removeClass('shaking')
        $(this).addClass('show-drink-empty')
      })
    }
  })
})
