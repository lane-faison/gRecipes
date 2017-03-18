
exports.up = function(knex, Promise) {
  return knex.schema.createTable('step', function (table) {
    table.increments()
    table.string('body')
    table.integer('order')
    table.integer('recipe_id').references('recipe.id').onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('step')
};
