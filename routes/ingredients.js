var knex = require('../db/knex');
function Ingredient() {
  return knex('ingredient');
}
