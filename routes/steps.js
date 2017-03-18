const express = require('express')
const router = express.Router()
var knex = require('../db/knex')
function Step() {
  return knex('step');
}

// http GET localhost:8000/steps
router.get('/', (req, res) => {
  Step().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/steps/:id
router.get('/:id', (req,res) => {
  Step().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})
module.exports = router
