var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

// Adding and Removing Ingredients from List
var ingredientArray = []

$(document).on('click', '.btn-ingredient', function () {
  var ingObj = {}
  ingObj.name = $('#InputDrinkIngredient').val()
  ingredientArray.unshift(ingObj)
  $('#InputDrinkIngredient').val("")
  $('.new-ingredient').hide()
  for (var i = 0; i < ingredientArray.length; i++) {
    $('.added-ingredients').append(`<div class='new-ingredient'><button type='button' class='remove-ingredient' value='${i}'><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><p>${ingredientArray[i].name}</p></div>`)
  }
})

$(document).on('click', '.remove-ingredient', function () {
  var indexToRemove = $(this).attr('value')
  ingredientArray.splice(indexToRemove, 1)
  $('.new-ingredient').hide()
  for (var i = 0; i < ingredientArray.length; i++) {
    $('.added-ingredients').append(`<div class='new-ingredient'><button type='button' class='remove-ingredient'><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><p>${ingredientArray[i]}</p></div>`)
  }
})


// Adding and Removing Steps from List
var stepArray = []

$(document).on('click', '.btn-step', function () {
  var stepObj = {}
  stepObj.body = $('#InputDrinkStep').val()
  stepArray.unshift(stepObj)
  $('#InputDrinkStep').val("")
  $('.new-step').hide()
  for (var i = 0; i < stepArray.length; i++) {
    $('.added-steps').append(`<div class='new-step'><button type='button' class='remove-step' value='${i}'><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><p>${stepArray[i].body}</p></div>`)
  }
})

$(document).on('click', '.remove-step', function () {
  var indexToRemove = $(this).attr('value')
  stepArray.splice(indexToRemove, 1)
  $('.new-step').hide()
  for (var i = 0; i < stepArray.length; i++) {
    $('.added-steps').append(`<div class='new-step'><button type='button' class='remove-step'><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><p>${stepArray[i]}</p></div>`)
  }
})


// Submitting a new drink recipe
$(document).on('click','.btn-add-drink', function (event) {
  var newUser = {
    username: $('#InputUsername').val(),
    avatar: $('#InputUserURL').val()
  }

  var newRecipe = {
    name: $('#InputDrinkTitle').val(),
    description: $('#InputDrinkDescription').val(),
    image: $('#InputDrinkURL').val(),
  }

  if ($.trim($('#InputUsername').val()) === "" || $.trim($('#InputUserURL').val()) === "" || $.trim($('#InputDrinkTitle').val()) === "" || $.trim($('#InputDrinkDescription').val()) === "" || $.trim($('#InputDrinkURL').val()) === "" || !ingredientArray.length || !stepArray.length) {
    event.preventDefault()
    alert('Please fill out the entire drink form in order for it to be added.')
    return false
  }
  else if ($('.age-check').prop('checked') == false) {
    event.preventDefault()
    alert('You are not old enough to add a drink. Please come back when you are 21!')
    return false
  }
  else {
    event.preventDefault()
    return $.post(`${server}/users`, newUser)
    .then((result) => {
      newRecipe.user_id = result[0]
      return $.post(`${server}/recipes`, newRecipe)
    })
    .then((recipeId) => {
      // recipeId is properly returned as an integer
      var ingPromises = []
      var stepPromises =[]
      for (let j = 0; j < ingredientArray.length; j++) {
        ingPromises.push( $.post(`${server}/ingredients`, ingredientArray[j]) )
      }
      return Promise.all(ingPromises)
        .then( ingredients => {
          var ingRecPromises = []
          for (let k = 0; k < ingredients.length; k++) {
            var ingredientElement = {
              ingredient_id: ingredients[k],
              recipe_id: recipeId
            }
            ingRecPromises.push($.post(`${server}/join`, ingredientElement))
          }
          return Promise.all(ingRecPromises)
        })
        .then( result => {
          for (let m = 0; m < stepArray.length; m++) {
            stepArray[m].order = m + 1
            stepArray[m].recipe_id = recipeId
            stepPromises.push($.post(`${server}/steps`, stepArray[m]))
          }
          console.log('Entire recipe successfully added!');
          return Promise.all(stepPromises)
        })
    })
  }
})
