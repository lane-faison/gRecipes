var recipeID;
var count = 0;
var local = 'http://localhost:8000'
var heroku = 'https://blooming-reaches-89522.herokuapp.com/grecipes'
var server = heroku

$(document).ready(function () {

  recipeID = getUrlParameter('id')

  $.get(`${server}/recipes/${recipeID}`, function (data) {
    console.log('data:')
    console.log(data)
    var userID = data.user_id

    $('.recipe-main').append(
      `<section class='recipe-all'>
        <div class='recipe-info-left'>
          <div class='recipe-information'>
          <h1>${data.title}</h1>
          <div class='rating-div'></div>
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
    $.get(`${server}/users/${userID}`, function (user) {
      console.log('user:')
      console.log(user)
      $(`<h4 class='by-username'>Mixed by ${user.name}</h4>`).insertBefore('.drink-description')
      $('.recipe-user-div').append(`<img class='recipe-user' src='${user.avatar}'>`)
    })
  })

  $.get(`${server}/ingredients`, function (ingredients) {

    console.log('ingredients:')
    for (var i = 0; i < ingredients.length; i++) {
      if (ingredients[i].recipe_id == recipeID) {
        console.log(ingredients[i])
      $('.recipe-ingredients').append(`<div class='each-ingredient'><button type='button' class='btn-ingredient'><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button><p>${ingredients[i].name}</p></div>`)
      }
    }
  })

  $.get(`${server}/steps`, function (steps) {
    console.log('steps:')
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].recipe_id == recipeID) {
        console.log(steps[i])
        count++
        $('.recipe-directions').append(`<p>${count}. ${steps[i].body}`)
      }
    }
  }).then(function () {
    $('.recipe-directions').append(`<p>${count + 1}. ENJOY!`)
  })

  $.get(`${server}/reviews`, function (reviews) {
    console.log('reviews:')
    var ratingArray = []

    for (let i = 0; i < reviews.length; i++) {

      if (reviews[i].recipe_id == recipeID) {
        console.log(reviews[i]);
        ratingArray.push(reviews[i].rating)

        $('.recipe-reviews').append(`<div class='each-rating'><div class='review-user' id='${i}R'></div><div class='each-rating-stars' id='${i}S'></div><p>${reviews[i].body}</p></div>`)

        console.log(i)

        $.get(`${server}/users/${reviews[i].user_id}`, function (result) {
          console.log(result);
          console.log(i + 'iteration');
          console.log(reviews[i].user_id);
          return $(`#${i}R`).append(`<h4>${result.name}</h4>`)
        })

        for (var j = 0; j < reviews[i].rating; j++) {
          $(`#${i}S`).append('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>')
        }

        if (reviews[i].rating < 5) {
          var blankStars = 5 - reviews[i].rating
          for (var k = 0; k < blankStars; k++) {
            $(`#${i}S`).append('<span class="glyphicon glyphicon-star empty-star" aria-hidden="true"></span>')          }
        }
      }
    }
    var ratingArrayLength = ratingArray.length
    var ratingSum = ratingArray.reduce(function (acc, val) {
      return acc + val
    }, 0)
    var ratingAverage = Math.round(ratingSum / ratingArrayLength)
    for (var i = 0; i < ratingAverage; i++) {
      $('.rating-div').append('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>')
    }
    if (ratingAverage < 5) {
      var blankStars = 5 - ratingAverage
      for (var i = 0; i < blankStars; i++) {
        $('.rating-div').append('<span class="glyphicon glyphicon-star empty-star" aria-hidden="true"></span>')
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
