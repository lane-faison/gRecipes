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
  $('.available-drink').remove()
  var selectedID = $(event.target).attr('id')
  $.get(`${server}/join`, function (data) {
    var recipesNeeded = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].ingredient_id == selectedID) {
        recipesNeeded.push(data[i].recipe_id)
      }
    }
    console.log('recipesNeeded')
    console.log(recipesNeeded)
    return Promise.all(recipesNeeded)
    .then(function (result) {
      console.log(result);
      $.get(`${server}/recipes`, function (data) {
        for (var j = 0; j < result.length; j++) {
          for (var k = 0; k < data.length; k++) {
            if (data[k].id == result[j]) {
              $('.drink-list').append(`<h4 class='available-drink'>${data[k].name}</h4>`)
            }
          }
        }
      })
    })
  })
})

// $('.available-drinks').append(`<h4>`)
