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
router.get('/:id', (req,res) => {
  Recipe().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http POST localhost:8000/recipes name='' image='' description='' user_id=''
router.post('/', (req,res) => {
  return Recipe().insert({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    user_id: req.body.user_id
  },['id','name','image','description','user_id'])
  .then( result => {
    res.json(result[0].id)
  })
})

// http PATCH localhost:8000/recipes/:id description='' name=''
router.put('/:id', (req,res) => {
  Recipe().where('id',req.params.id).update({
    description: req.body.description,
    name: req.body.name
  },['name','description','image','id'])
  .then( result => {
    res.json(result)
  })
})

// http DELETE localhost:8000/recipes/:id
router.delete('/:id', (req,res) => {
  Recipe().where('id',req.params.id).del()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
