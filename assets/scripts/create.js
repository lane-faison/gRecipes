$(document).ready(function () {

})

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

$(document).on('click', '.btn-add-drink', function (event) {
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
    var newDrink = {
      username: $('#InputUsername').val(),
      avatar: $('#InputUserURL').val(),
      title: $('#InputDrinkTitle').val(),
      description: $('#InputDrinkDescription').val(),
      image: $('#InputDrinkURL').val(),
      ingredients: ingredientArray,
      steps: stepArray
    }
    console.log(newDrink)
  }
})
