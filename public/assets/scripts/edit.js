var recipeID;
var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = local

$(document).ready(function () {
  recipeID = getUrlParameter('id')
  $.get(`${server}/recipes/${recipeID}`, data => {
    $('#InputDrinkTitle').val(`${data[0].name}`)
    $('#InputDrinkDescription').val(`${data[0].description}`)
  })
})

$(document).on('click','.btn-submit', function () {
  event.preventDefault()
  var updatedRecipe = {
    name: $('#InputDrinkTitle').val(),
    description: $('#InputDrinkDescription').val()
  }
  if ($('.age-check').prop('checked') == false) {
    event.preventDefault()
    alert('You are not old enough to edit a drink recipe. Please come back when you are 21!')
    return false
  } else {
    console.log(updatedRecipe);
    $.ajax({
      url: `${server}/recipes/${recipeID}`,
      type: 'PUT',
      data: updatedRecipe,
      success: function (result) {
        console.log('Successfully edited')

        window.location.href = `${server}/recipe.html?id=${recipeID}`
      },
      failure: function (result) {
        console.log('Something went wrong')
      }
    })    
  }
})

// DELETE RECIPE
$(document).on('click','.btn-delete', function () {
  event.preventDefault()
  var confirmation = confirm('Are you sure you want to delete the entire recipe? This action cannot be undone.')
  if (confirmation === true) {
    $.ajax({
      url: `${server}/recipes/${recipeID}`,
      type: 'DELETE',
      success: function (result) {
        console.log('trying to switch pages...')
        window.location.href = 'index.html'
      },
      failure: function (result) {
        console.log('Unable to delete')
      }
    })
  }
})

// GRAB ID FROM URL FUNCTION
function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1))
  const sURLVariables = sPageURL.split('&')
  let returner

  sURLVariables.forEach((paraName) => {
    const sParameterName = paraName.split('=')
    if (sParameterName[0] === sParam) {
      returner = sParameterName[1] === undefined ? true : sParameterName[1]
    }
  })
  return returner
}
