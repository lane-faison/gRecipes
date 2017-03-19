// const recipes = require('./db/recipes.json')
// const ingredients = require('./db/ingredients.json')
// const reviews = require('./db/reviews.json')
// const steps = require('./db/steps.json')
// const users = require('./db/users.json')
// const express = require('express')
// const cors = require('cors')
// const server = express()
// const bodyParser = require('body-parser')
// const fs = require('fs')
// const PORT = process.env.PORT || 8000
//
// server.use(bodyParser.json())
// server.use(cors())
//
// server.listen(PORT, function () {
//   console.log(`Server listening on PORT ${PORT}`);
// })
//
// // GET ALL
// server.get('/ingredients', (req,res) => {
//   res.status(200).json(ingredients)
// })
// server.get('/recipes', (req,res) => {
//   res.status(200).json(recipes)
// })
// server.get('/reviews', (req,res) => {
//   res.status(200).json(reviews)
// })
// server.get('/steps', (req,res) => {
//   res.status(200).json(steps)
// })
// server.get('/users', (req,res) => {
//   res.status(200).json(users)
// })
//
// // GET BY ID
// server.get('/ingredients/:id', (req,res) => {
//   const id = req.params.id
//   if (id >= 0 && id <ingredients.length) {
//     res.status(200).json(ingredients[id -1])
//   }
//   else {
//     res.setHeader("Content-Type", "text/plain")
//     res.status(404).send('Not Found')
//   }
// })
// server.get('/recipes/:id', (req,res) => {
//   const id = req.params.id
//   if (id >= 0 && id <recipes.length) {
//     res.status(200).json(recipes[id -1])
//   }
//   else {
//     res.setHeader("Content-Type", "text/plain")
//     res.status(404).send('Not Found')
//   }
// })
// server.get('/reviews/:id', (req,res) => {
//   const id = req.params.id
//   if (id >= 0 && id <reviews.length) {
//     res.status(200).json(reviews[id -1])
//   }
//   else {
//     res.setHeader("Content-Type", "text/plain")
//     res.status(404).send('Not Found')
//   }
// })
// server.get('/steps/:id', (req,res) => {
//   const id = req.params.id
//   if (id >= 0 && id <steps.length) {
//     res.status(200).json(steps[id -1])
//   }
//   else {
//     res.setHeader("Content-Type", "text/plain")
//     res.status(404).send('Not Found')
//   }
// })
// server.get('/users/:id', (req,res) => {
//   const id = req.params.id
//   if (id >= 0 && id <users.length) {
//     res.status(200).json(users[id -1])
//   }
//   else {
//     res.setHeader("Content-Type", "text/plain")
//     res.status(404).send('Not Found')
//   }
// })
//
//
//
//
// // // CREATE
// // server.post('/ingredients/', (req,res) => {
// //   var newIngredient = {
// //     name: req.body.name
// //   }
// //   ingredients.push(newIngredient)
// //   fs.writeFileSync('./db/ingredients.json',
// //   JSON.stringify(ingredients))
// //   res.setHeader('Content-Type', 'application/json')
// //   res.status(200).send(ingredients[ingredients.length-1])})
// // }
// //
// // server.post('/recipes/', (req,res) => {
// //   var newRecipe = {
// //     id: parseInt(req.body.id),
// //     user_id: parseInt(req.body.user_id),
// //     title: req.body.title,
// //     description: req.body.description,
// //     image: req.body.image
// //   }
// //   recipes.push(newRecipe)
// //   fs.writeFileSync('./db/recipes.json',
// //   JSON.stringify(recipes))
// //   res.setHeader('Content-Type', 'application/json')
// //   res.status(200).send(recipes[recipes.length-1])})
// // }
// // server.post('/ingredients/', (req,res) => {
// //   var newIngredient = {
// //     id: parseInt(req.body.id),
// //     name: req.body.name
// //   }
// //   ingredients.push(newIngredient)
// //   fs.writeFileSync('./db/ingredients.json',
// //   JSON.stringify(ingredients))
// //   res.setHeader('Content-Type', 'application/json')
// //   res.status(200).send(ingredients[ingredients.length-1])})
// // }
// // server.post('/ingredients/', (req,res) => {
// //   var newIngredient = {
// //     id: parseInt(req.body.id),
// //     name: req.body.name
// //   }
// //   ingredients.push(newIngredient)
// //   fs.writeFileSync('./db/ingredients.json',
// //   JSON.stringify(ingredients))
// //   res.setHeader('Content-Type', 'application/json')
// //   res.status(200).send(ingredients[ingredients.length-1])})
// // }
// // server.post('/ingredients/', (req,res) => {
// //   var newIngredient = {
// //     id: parseInt(req.body.id),
// //     name: req.body.name
// //   }
// //   ingredients.push(newIngredient)
// //   fs.writeFileSync('./db/ingredients.json',
// //   JSON.stringify(ingredients))
// //   res.setHeader('Content-Type', 'application/json')
// //   res.status(200).send(ingredients[ingredients.length-1])})
// // }
//
// module.exports = server
