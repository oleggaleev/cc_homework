const kx = require('knex')({
  client: 'pg',
  connection: {
    database: 'teampicker_db'
  }
})

// kx.on('query', query => {
//   console.log(query.sql)
//   console.log(query.bindings)
// })

module.exports = kx
