exports.seed = (knex, Promise) => {
  return knex('step').del()
    .then( () => {
      return knex('step').insert([
        {recipe_id: knex('recipe').where('name','Margarita').select('id') , body: 'Wet the rim of your glass with a lime. Cut a small slit into a slice of lime and place the lime on the rim of your glass. Run the lime around the rim of your glass to wet it.', order: 1},
        {recipe_id: knex('recipe').where('name','Margarita').select('id') , body: 'Salt your glass’s rim. Pour some coarse (kosher or sea) salt onto a plate. Holding your glass parallel to the plate, let its rim touch the salt and then slowly turn it.', order: 2},
        {recipe_id: knex('recipe').where('name','Margarita').select('id') , body: 'Fill a cocktail shaker 2/3 to 3/4 full with ice. Use large ice cubes, as smaller ones will melt more quickly and dilute your drink.', order: 3},
        {recipe_id: knex('recipe').where('name','Jack & Coke').select('id') , body: 'Serve over ice in tall glass.', order: 1},
        {recipe_id: knex('recipe').where('name','Jack & Coke').select('id') , body: 'Garnish with slice of lime.', order: 2},
        {recipe_id: knex('recipe').where('name','Cosmopolitan').select('id') , body: 'Add all the ingredients to a shaker and fill with ice.', order: 1},
        {recipe_id: knex('recipe').where('name','Cosmopolitan').select('id') , body: 'Shake, and strain into a chilled cocktail glass.', order: 2},
        {recipe_id: knex('recipe').where('name','Cosmopolitan').select('id') , body: 'Garnish with a lime wedge.', order: 3}
      ])
    })
}
