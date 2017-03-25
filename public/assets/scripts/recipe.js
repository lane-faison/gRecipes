var recipeID;
var count = 0;
var local = 'http://localhost:8000'
var heroku = 'https://g-drinks.herokuapp.com'
var server = heroku

$(document).ready(function () {

  recipeID = getUrlParameter('id')

  $.get(`${server}/recipes/${recipeID}`, function (data) {

    var userID = data[0].user_id

    $('.recipe-main').append(
      `<section class='recipe-all'>
        <div class='recipe-info-left'>
          <div class='recipe-information'>
          <h1>${data[0].name}</h1>
          <div class='rating-div'></div>
          <p class='drink-description'>${data[0].description}</p>
          </div>
          <div class='recipe-info-bottom'>
            <div class='recipe-image-div'>
              <img class='recipe-image' src='${data[0].image}'>
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
      $(`<h4 class='by-username'>Mixed by ${user[0].name}</h4>`).insertBefore('.drink-description')
      $('.recipe-user-div').append(`<img class='recipe-user' src='${user[0].avatar}'>`)
    })
    $('.option-btns').append(`<a href='edit.html?id=${recipeID}'><button type="button" class="btn btn-default btn-edit-recipe btn-edit">Edit Recipe</button></a>`)
  })

  $.get(`${server}/join`, function (data) {
    var ingNeeded = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].recipe_id == recipeID) {
        ingNeeded.push(data[i].ingredient_id)
      }
    }
    return Promise.all(ingNeeded)
    .then(function (result) {
      $.get(`${server}/ingredients`, function (data) {
        for (var i = 0; i < result.length; i++) {
          for (var k = 0; k < data.length; k++) {
            if (data[k].id == ingNeeded[i]) {
              $('.recipe-ingredients').append(`<div class='each-ingredient'><button type='button' class='btn-ingredient'><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button><p class='one-ingredient'>${data[k].name}</p></div>`)
            }
          }
        }
      })
    })
  })

  // DRINK STEPS SECTION
  $.get(`${server}/steps`, function (steps) {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].recipe_id == recipeID) {
        count++
        $('.recipe-directions').append(`<p>${count}. ${steps[i].body}`)
      }
    }
  }).then(function () {
    $('.recipe-directions').append(`<p>${count + 1}. ENJOY!`)
  })

  // DRINK REVIEW SECTION
  $.get(`${server}/reviews`, function (reviews) {
    var ratingArray = []

    for (let i = 0; i < reviews.length; i++) {

      if (reviews[i].recipe_id == recipeID) {
        ratingArray.push(reviews[i].rating)

        $(`<div class='each-rating'><div class='review-user' id='${i}R'></div><div class='each-rating-stars' id='${i}S'></div><p>${reviews[i].body}</p></div>` ).insertBefore($('.review-form'))


        $.get(`${server}/users/${reviews[i].user_id}`, function (result) {
          return $(`#${i}R`).append(`<h4>${result[0].name}</h4>`)
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
    for (let i = 0; i < ratingAverage; i++) {
      $('.rating-div').append('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>')
    }
    if (ratingAverage < 5) {
      var blankStars = 5 - ratingAverage
      for (let i = 0; i < blankStars; i++) {
        $('.rating-div').append('<span class="glyphicon glyphicon-star empty-star" aria-hidden="true"></span>')
      }
    }
  })
})


// ADD NEW REVIEW SECTION
$(document).on('click','.add-review', function () {
  $('.review-form').show()
  $('html body').animate({
    scrollTop: $('.review-form').offset().top
  },1000)
})

// SUBMIT NEW REVIEW
$(document).on('click','.btn-submit-review', function () {
  event.preventDefault()
  if ($.trim($('#ReviewUsername').val()) === "" || $.trim($('#ReviewBody').val()) === "" || $.trim($('#ReviewRating').val()) === "") {
    alert('Please fill out the required fields!')
  } else {
    if ($.trim($('#ReviewUserURL').val()) === "") {
      var userName = $('#ReviewUsername').val()
      var userAvatar = 'http://crowsnestonline.co.uk/forum/images/misc/Unknown.png'
    } else {
      var userName = $('#ReviewUsername').val()
      var userAvatar = $('#ReviewUserURL').val()
    }

    var userInfo = {
      username: userName,
      avatar: userAvatar
    }

    $.post(`${server}/users`, userInfo, function (result) {
      return result
    }).then( result => {
      var newReview = {
        body: $('#ReviewBody').val(),
        rating: $('#ReviewRating').val(),
        user_id: result[0],
        recipe_id: recipeID
      }
      $.post(`${server}/reviews`, newReview, function (result) {
        location.reload()
      })
    })
  }
})

// INTERACTIVE INGREDIENTS
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
