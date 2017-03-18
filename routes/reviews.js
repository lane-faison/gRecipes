var knex = require('../db/knex');
function Review() {
  return knex('review');
}
