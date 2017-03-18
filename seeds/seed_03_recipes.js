exports.seed = (knex, Promise) => {
  return knex('recipe').del()
    .then( () => {
      return knex('recipe').insert([
        {user_id: knex('user').where('name','Lane Faison').select('id'), name: 'Margarita', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'http://cdn.liquor.com/wp-content/uploads/2016/11/16132003/margarita-rocks-salt-720sq.jpg'},
      {user_id: knex('user').where('name','Amanda Hayes').select('id'), name: 'Cranberry Vodka', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://uk.thebar.com/assets/en-gb/Images/AY/34660__dia_1425_950_1_vodka-cranberry_59_$$069A0000001gyMXIAY.jpg?maxheight=950&maxwidth=1425&quality=80' },
      {user_id: knex('user').where('name','Will Faison').select('id'), name: 'Jack & Coke', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'https://s-media-cache-ak0.pinimg.com/736x/8c/f2/01/8cf201ebe8dde7c972a0c8e376283193.jpg'},
      {user_id: knex('user').where('name','Katelyn Faison').select('id'), name: 'Cosmopolitan', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', image: 'http://winelifetoday.com/wp-content/uploads/2015/04/5434949056_788b0b4450_z-630x427.jpg'}
      ])
    })
}
