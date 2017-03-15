var recipeID;
var count = 0;

$(document).ready(function () {

  var server = 'http://localhost:8000/'

  recipeID = getUrlParameter('id')

  $.get(`${server}recipes/${recipeID}`, function (data) {

    console.log(data);

    var userID = data.user_id

    console.log('recipeID is ' + recipeID)
    console.log('userID is ' + userID)

    $('.recipe-main').append(
      `<section class='recipe-all'>
        <div class='recipe-info-left'>
          <div class='recipe-information'>
          <h1>${data.title}</h1>
          <p class='drink-description'>${data.description}</p>
          </div>
          <div class='recipe-info-bottom'>
            <div class='recipe-image-div'>
              <img class='recipe-image' src='${data.image}'>
            </div>
            <div class='recipe-user-div'>
            </div>
          </div>
        </div>
        <div class='recipe-info-right'>
          <div class='recipe-ingredients'>
            <h2>Ingredients</h2>
          </div>
          <div class='recipe-directions'>
            <h2>Directions</h2>
          </div>
        </div>
      </section>`
    )
    $.get(`${server}users/${userID}`, function (user) {
      console.log(user);
      $(`<h4 class='by-username'>Mixed by ${user.name}</h4>`).insertBefore('.drink-description')
      $('.recipe-user-div').append(`<img class='recipe-user' src='${user.avatar}'>`)
    })
  })

  $.get(`${server}ingredients`, function (ingredient) {
    for (var i = 0; i < 6; i++) {
      $('.recipe-ingredients').append(`<div class='each-ingredient'><button type='button' class='btn-ingredient'><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button><p>${ingredient[i].name}</p></div>`)
    }
  })

  $.get(`${server}steps`, function (steps) {
    console.log('recipe steps:');
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].recipe_id == recipeID) {
        console.log(steps[i]);
        count++
        $('.recipe-directions').append(`<p>${count}. ${steps[i].body}`)
      }
    }
  }).then(function () {
    $('.recipe-directions').append(`<p>${count + 1}. ENJOY!`)
  })

  $.get(`${server}reviews`, function (reviews) {
    console.log(reviews);
    for (var i = 0; i < reviews.length; i++) {
      if (reviews[i].recipe_id == recipeID) {
        $('.recipe-reviews').append(`<div class='each-rating'><h4>Rating: ${reviews[i].rating}/5</h4><h3>${reviews[i].body}</h3></div>`)
      }
    }
  })
})

$(document).on('click','.btn-ingredient', function () {
  if (!$(this).hasClass('gotIt')) {
    $(this).find('.glyphicon-plus').hide()
    $(this).find('.glyphicon-ok').show()
    $(this).addClass('gotIt')
  }
  else {
    $(this).find('.glyphicon-plus').show()
    $(this).find('.glyphicon-ok').hide()
    $(this).removeClass('gotIt')
  }
})






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
