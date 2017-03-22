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

// http POST localhost:8000/ingredients_recipes recipe_id=# ingredient_id=#
router.post('/', (req,res) => {
  Join().where('recipe_id',req.body.recipe_id).andWhere('ingredient_id',req.body.ingredient_id).select()
  .then( result => {
    if(result.length === 0) {
      Join().insert({
        recipe_id: req.body.recipe_id,
        ingredient_id: req.body.ingredient_id
      },['recipe_id','ingredient_id'])
      .then( result => {
        res.json(result[0])
      })
    }
    else {
      res.status(500).send('This combination already exists')
    }
  })
})

module.exports = router
