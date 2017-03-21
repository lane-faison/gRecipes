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

// http POST localhost:8000/users name='' avatar=''
router.post('/', (req,res) => {
  User().where('name',req.body.username).select()
  .then ( result => {
    console.log(result)
    if(result.length === 0) {
      console.log('User does not exist...creating!');
      return User().insert({
        name: req.body.username,
        avatar: req.body.avatar
      })
      .then( (result) => {
        res.json(result)
      })
    }
    else {
      console.log('User already exists!')
      res.status(404)
    }
  })
})



























module.exports = router
