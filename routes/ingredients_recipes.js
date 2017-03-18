const express = require('express')
const router = express.Router()
const knex = require('../db/knex')


function Join() {
  return knex('ingredient_recipe')
}

// http GET localhost:8000/ingredients_recipes
router.get('/', (req, res) => {
  Join().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
