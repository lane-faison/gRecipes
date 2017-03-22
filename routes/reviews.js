const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Review() {
  return knex('review');
}

// http GET localhost:8000/reviews
router.get('/', (req, res) => {
  Review().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/reviews/:id
router.get('/:id', (req,res) => {
  Review().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http POST localhost:8000/reviews body='' rating=# recipe_id=# user_id=#
router.post('/', (req,res) => {
  Review().insert({
    body: req.body.body,
    rating: req.body.rating,
    recipe_id: req.body.recipe_id,
    user_id: req.body.user_id
  },['id','user_id','recipe_id','body','rating'])
  .then( result => {
    res.json(result)
  })
})
module.exports = router
