var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

$(document).ready(function () {
  $.get(`${server}/ingredients`, function (data) {
    data.forEach(function (ingredient, i, data) {
      $('.ingredient-list').append(`<h4 id=${ingredient.id} class='ingredient-item'>${ingredient.name}</h4>`)
    })
  })
})

$(document).on('click','.ingredient-item', function (event) {
  $(event.target).addClass('chosen')
  var selectedID = $(event.target).attr('id')
  console.log(selectedID)
  $.get(`${server}/join`, function (data) {
    console.log(data);
    var recipesNeeded = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].ingredient_id == selectedID) {
        recipesNeeded.push(data[i].recipe_id)
      }
    }
    return Promise.all(recipesNeeded)
    .then(function (result) {
      $.get(`${server}/recipes`, function (data) {
        for (var i = 0; i < data.length; i++) {
          for (var k = 0; k < result.length; k++) {
            if (array[i].name == result[k]) {
              $('.drink-list').append(`<h4>${data[i].name}</h4>`)
            }
          }
        }
      })
    })
  })
})

// $('.available-drinks').append(`<h4>`)
