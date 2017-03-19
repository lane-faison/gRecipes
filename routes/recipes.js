const express = require('express')
const router = express.Router()
const knex = require('../db/knex')

function Recipe() {
  return knex('recipe');
}

// http GET localhost:8000/recipes
router.get('/', (req, res) => {
  Recipe().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/recipes/:id
router.get('recipe/:id', (req,res) => {
  Recipe().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
