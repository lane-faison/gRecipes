var knex = require('../db/knex');
function Step() {
  return knex('step');
}
