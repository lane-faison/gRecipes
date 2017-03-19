const ingredients = require('./routes/ingredients.js')
const recipes = require('./routes/recipes.js')
const reviews = require('./routes/reviews.js')
const steps = require('./routes/steps.js')
const users = require('./routes/users.js')
const join = require('./routes/ingredients_recipes.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const pg = require('pg')
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())
// app.use(pg())

app.use('/ingredients', ingredients)
app.use('/recipes', recipes)
app.use('/reviews', reviews)
app.use('/steps', steps)
app.use('/users', users)
app.use('/join', join)


app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
})
