exports.seed = (knex, Promise) => {
  return knex('ingredient').del()
    .then( () => {
      return knex('ingredient').insert([
        {name: 'Tequilla'},
        {name: 'Lime juice'},
        {name: 'Lime'},
        {name: 'Lemon'},
        {name: 'Cointreau'},
        {name: 'Coca-Cola'},
        {name: 'Whiskey'},
        {name: 'Bourbon'},
        {name: 'Rum'},
        {name: 'Triple Sec'},
        {name: 'Root Beer'},
        {name: 'Crushed ice'},
        {name: 'Salt'},
        {name: 'Ice cubes'},
        {name: 'Vodka'},
        {name: 'Sugar'},
        {name: 'Ginger Ale'},
        {name: 'Water'},
        {name: 'Lemon juice'},
        {name: 'Cranberry juice'}
      ])
    })
}
