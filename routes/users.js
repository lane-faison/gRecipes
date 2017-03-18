const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function User() {
  return knex('user');
}

// http GET localhost:8000/users
router.get('/', (req, res) => {
  User().select()
  .then( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// http GET localhost:8000/users/:id
router.get('/:id', (req,res) => {
  User().select().where('id',req.params.id)
  .then ( result => {
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

module.exports = router
