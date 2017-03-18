exports.seed = (knex, Promise) => {
  return knex('review').del()
    .then( () => {
      return knex('review').insert([
        {user_id: knex('user').where('name','Lane Faison').select('id'), recipe_id: knex('recipe').where('name','Cosmopolitan').select('id'), body: 'This was the best cosmo I have ever made. Thanks!', rating: 5},
        {user_id: knex('user').where('name','Lane Faison').select('id'), recipe_id: knex('recipe').where('name','Jack & Coke').select('id'), body: 'This was the best Jack & Coke I have ever made. Thanks!', rating: 4},
        {user_id: knex('user').where('name','Amanda Hayes').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id'), body: 'This was a pretty good recipe. More salt makes this one perfect.', rating: 3},
        {user_id: knex('user').where('name','Amanda Hayes').select('id'), recipe_id: knex('recipe').where('name','Jack & Coke').select('id'), body: 'Whiskey is definitely not my thing', rating: 2},
        {user_id: knex('user').where('name','Will Faison').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id'), body: 'This was the best Margarita I have ever made. Thanks!', rating: 5},
        {user_id: knex('user').where('name','Will Faison').select('id'), recipe_id: knex('recipe').where('name','Cranberry Vodka').select('id'), body: 'This was the best CV I have ever made. Thanks!', rating: 5},
        {user_id: knex('user').where('name','Katelyn Faison').select('id'), recipe_id: knex('recipe').where('name','Cranberry Vodka').select('id'), body: 'This was the best CV I have had in a long time. Thanks for the recipe!', rating: 4},
        {user_id: knex('user').where('name','Katelyn Faison').select('id'), recipe_id: knex('recipe').where('name','Margarita').select('id'), body: 'Too sweet. Needs more Tequilla in recipe.', rating: 2}
      ])
    })
}
