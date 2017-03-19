var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

// Adding and Removing Ingredients from List
var ingredientArray = []

$(document).on('click', '.btn-ingredient', function () {
  ingredientArray.unshift($('#InputDrinkIngredient').val())
  $('#InputDrinkIngredient').val("")
  $('.new-ingredient').hide()
  for (var i = 0; i < ingredientArray.length; i++) {
    $('.added-ingredients').append(`<div class='new-ingredient'><button type='button' class='remove-ingredient' value='${i}'><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><p>${ingredientArray[i]}</p></div>`)
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
  stepArray.unshift($('#InputDrinkStep').val())
  $('#InputDrinkStep').val("")
  $('.new-step').hide()
  for (var i = 0; i < stepArray.length; i++) {
    $('.added-steps').append(`<div class='new-step'><button type='button' class='remove-step' value='${i}'><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button><p>${stepArray[i]}</p></div>`)
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
$(document).on('click', '.btn-add-drink', function (event) {
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
    $.post(`${server}/users/`, newUser)
    // TODO: Make sure new user ID is returned after a USER POST
    .then((userId) => {
      // Adds userId to newRecipe before POST
      newRecipe.user_id = userId[0]

      return $.post(`${server}/recipes/`, newRecipe)

      // TODO: Make sure new recipe ID is returned after a RECIPE POST
    })
    .then((recipeId) => {
      var ingPromises = []
      var stepPromises =[]

      for (let i = 0; i < ingredientArray.length; i++) {

        ingPromises.push($.post(`${server}/ingredients/`, ingredientArray[i]))
        // TODO: Make sure ingredient ID is returned after ingredient POST
      }
      return Promise.all(ingPromises)
        .then((ingredients) => {
          var ingRecPromises = []
          for (let i = 0; i < ingredients.length; i++) {

            // Set up ingredient_id and recipe_id for the ingredient_recipe join table

            var ingredientElement = {
              ingredient_id: ingredients[i].id,
              recipe_id: recipeId[0]
            }

            ingRecPromises.push($.post(`${server}/joins/`, ingredientElement))

          }
          return Promise.all(ingRecPromises)
        })
        .then((result) => {
          for (let i = 0; i < newSteps.length; i++) {

            // TODO: Add recipe ID to each step

            newSteps[i].recipe_id = recipeId[0]

            stepPromises.push($.post(`${server}/steps/`, newSteps[i]))
          }
          return Promise.all(stepPromises)
        })

    })
  }
})
