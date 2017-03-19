const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function Ingredient() {
  return knex('ingredient');
}

// http GET localhost:8000/ingredients
router.get('/', (req, res) => {
  Ingredient().select().orderBy('name','asc')
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/ingredients/:id
router.get('/:id', (req,res) => {
  Ingredient().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})




module.exports = router
