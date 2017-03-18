
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe', function (table) {
    table.increments()
    table.string('name')
    table.text('description')
    table.string('image')
    table.integer('user_id').references('user.id').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipe')
};
