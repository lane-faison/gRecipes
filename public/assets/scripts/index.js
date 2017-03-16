$(document).ready(function () {

  var server = 'https://blooming-reaches-89522.herokuapp.com/grecipes'

  $.get(`${server}/recipes`, function (data) {
    data.forEach(function (currentValue, i, data) {
      console.log(data[i]);
      $('.recipes-all').append(
        `<div class='recipes-one'>
          <div class='drink-img-div'>
            <img class='drink-img' src='${data[i].image}' alt='drink picture'>
          </div>
          <div class='div-name-rating'>
            <h3 class='drink-name'>${data[i].title}</h3>
            <h4>Rating: /5</h4>
          </div>
          <div class='drink-shaking'>
            <a href='recipe.html?id=${data[i].id}'><div class='drink-logo-div show-drink-empty'></div>
          </a>
          </div>
        </div>`
      )
    })
  })
  $.get(`${server}/reviews`, function (reviews) {
    console.log(reviews)


  })
})

// Shaker animation
$(document).on('mouseenter','.drink-logo-div', function () {

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
// End of shaker animation
