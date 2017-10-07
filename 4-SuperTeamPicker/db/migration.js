const kx = require('./connection')

kx.schema.createTable('cohorts', table => {
  table.increments('id')
  table.string('members')
  table.string('name')
  table.string('logo_url')
  table.timestamps(false, true)
}).then(() => process.exit())
  .catch(() => process.exit())
