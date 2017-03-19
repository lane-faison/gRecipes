var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

$(document).ready(function () {
  $.get(`${server}/ingredients`, function (data) {
    data.forEach(function (ingredient, i, data) {
      console.log(ingredient);
      $('.ingredient-list').append(`<h4 id=${ingredient.id}>${ingredient.name}</h4>`)
    })
  })
})
