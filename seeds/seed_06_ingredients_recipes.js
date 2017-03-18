exports.seed = (knex, Promise) => {
  return knex('ingredient_recipe').del()
    .then( () => {
      return knex('ingredient_recipe').insert([
        {ingredient_id: knex('ingredient').where('name','Salt').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id')},
        {ingredient_id: knex('ingredient').where('name','Lime').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id')},
        {ingredient_id: knex('ingredient').where('name','Lime juice').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id')},
        {ingredient_id: knex('ingredient').where('name','Tequilla').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id')},
        {ingredient_id: knex('ingredient').where('name','Coca-Cola').select('id'), recipe_id: knex('recipe').where('name','Jack & Coke').select('id')},
        {ingredient_id: knex('ingredient').where('name','Whiskey').select('id'), recipe_id: knex('recipe').where('name','Jack & Coke').select('id')},
        {ingredient_id: knex('ingredient').where('name','Cranberry juice').select('id'), recipe_id: knex('recipe').where('name','Cranberry Vodka').select('id')},
        {ingredient_id: knex('ingredient').where('name','Vodka').select('id'), recipe_id: knex('recipe').where('name','Cranberry Vodka').select('id')},
        {ingredient_id: knex('ingredient').where('name','Crushed ice').select('id'), recipe_id: knex('recipe').where('name','Cosmopolitan').select('id')},
        {ingredient_id: knex('ingredient').where('name','Lime').select('id'), recipe_id: knex('recipe').where('name','Cosmopolitan').select('id')},
        {ingredient_id: knex('ingredient').where('name','Vodka').select('id'), recipe_id: knex('recipe').where('name','Cosmopolitan').select('id')},
        {ingredient_id: knex('ingredient').where('name','Cranberry juice').select('id'), recipe_id: knex('recipe').where('name','Cosmopolitan').select('id')}
      ])
    })
}
