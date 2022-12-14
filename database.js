let mongoose = require('mongoose');

const server =  ''; // db server ip
const database = 'fcc-mongodb-and-mongoose.learn-mongodb'; // db name

class Database {
  constructor() {
    this._connect()
  }
}

_connect() {
  mongoose.connect(`mongodb://${server}/${database}`)
    .then(() => {
      console.log('Database connection successful')
    })
  .catch(err => {
    console.error('Database connection error')
  })
}

module.exports = new Database()
