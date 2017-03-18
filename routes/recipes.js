var knex = require('../db/knex');
function Recipe() {
  return knex('recipe');
}
