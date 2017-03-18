exports.seed = (knex, Promise) => {
  return knex('user').del()
    .then( () => {
      return knex('user').insert([
        {name: 'Lane Faison' , avatar: 'https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/16708545_10104816491624073_7852895858419525252_n.jpg?oh=7f852442b709e7805946039e953c3dbe&oe=5967472D'},
        {name: 'Amanda Hayes', avatar: 'https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/14141916_10104275898067893_8702395635609965454_n.jpg?oh=94d5fab80ba620bf8cd49ce78f7aaf0b&oe=59259C27'},
        {name: 'Will Faison', avatar: 'https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/14102605_969510945170_5262831610539766767_n.jpg?oh=95c2ef53dfb2a7fb5d3814debcb613ef&oe=592A271D'},
        {name: 'Katelyn Faison', avatar: 'https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/13776030_10100198319689274_7040816325908178072_n.jpg?oh=5a75beba2176528844f74429140435c1&oe=5964B332'}
      ])
    })
}
