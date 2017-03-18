
exports.up = function(knex, Promise) {
  return knex.schema.createTable('review', function (table) {
    table.increments()
    table.text('body')
    table.integer('rating')
    table.integer('user_id').references('user.id').onDelete('cascade')
    table.integer('recipe_id').references('recipe.id').onDelete('cascade')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('review')
};
