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

// http POST localhost:8000/ingredients name=''
router.post('/', (req,res) => {
  Ingredient().where('name',req.body.name).select('id')
  .then( result => {
    if (result.length === 0) {
      return Ingredient().insert({
        name: req.body.name
      },['id','name'])
      .then( result => {
        res.json(result[0].id)
      })
    }
    else {
      res.json(result[0].id)
    }
  })
})

module.exports = router
