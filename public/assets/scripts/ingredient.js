var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

$(document).ready(function () {
  $.get(`${server}/ingredients`, function (data) {
    data.forEach(function (ingredient, i, data) {
      $('.ingredient-list').append(`<div class='ingredient-item-div'>
      <button type='button' id=${ingredient.id} class='btn-ingredient'>
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      </button>
      <h4 class='ingredient-item'>${ingredient.name}</h4></div>`)
    })
  })
})

$(document).on('click','.btn-ingredient', function () {

  $('.available-drink').remove()

  if (!$(this).hasClass('gotIt')) {
    $('.btn-ingredient').removeClass('gotIt')
    $(this).find('.glyphicon-plus').hide()
    $(this).find('.glyphicon-ok').show()
    $(this).addClass('gotIt')
  }

  else {
    $(this).find('.glyphicon-plus').show()
    $(this).find('.glyphicon-ok').hide()
    $(this).removeClass('gotIt')
  }

  // TODO: REMOVE ACTUAL CHECK AFTER A DIFFERENT CLICK. CURRENTLY THE COLORS CHANGE PROPERLY BUT THE CHECK GLYPHICON REMAINS.

  var selectedID = $(this).attr('id')
  console.log(selectedID)

  $.get(`${server}/join`, function (data) {
    var recipesNeeded = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].ingredient_id == selectedID) {
        recipesNeeded.push(data[i].recipe_id)
      }
    }
    return Promise.all(recipesNeeded)
    .then(function (result) {
      $.get(`${server}/recipes`, function (data) {
        for (var j = 0; j < result.length; j++) {
          for (var k = 0; k < data.length; k++) {
            if (data[k].id == result[j]) {
              console.log(data[k].id);
              $('.drink-list').append(`<div class='available-item-div'><h4 class='available-drink'>${data[k].name}</h4></div>`)
            }
          }
        }
      })
    })
  })
})
