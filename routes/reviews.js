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

module.exports = router
