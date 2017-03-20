var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

$(document).ready(function () {
  $.get(`${server}/ingredients`, function (data) {
    data.forEach(function (ingredient, i, data) {
      console.log(ingredient);
      $('.ingredient-list').append(`<h4 id=${ingredient.id} class='ingredient-item'>${ingredient.name}</h4>`)
    })
  })
})

$(document).on('click','.ingredient-item', function (event) {
  $(this).addClass('chosen')
  var selectedID = $(this).attr('id')
  console.log(selectedID)
  $.get(`${server}/join`, function (data) {
    console.log(data);
  })
})
