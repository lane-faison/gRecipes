
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredient_recipe', function (table) {
    table.integer('ingredient_id').references('ingredient.id').onDelete('cascade')
    table.integer('recipe_id').references('recipe.id').onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ingredient_recipe')
};
