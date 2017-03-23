var recipeID;
var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = local

$(document).ready(function () {
  recipeID = getUrlParameter('id')
})

// TODO: GET THE DRINK NAME AND DRINK DESCRIPTION AUTOMATICALLY APPENDED INTO THE INPUT BOXES. ALSO, TRY TO FIGURE OUT WHY THE CHECKBOX IS NOW CENTERED. CREATE EDIT ROUTE!

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
