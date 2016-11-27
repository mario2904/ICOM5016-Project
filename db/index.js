const pgp = require('pg-promise')(/*options*/);

const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:8000/postgres');
db.connect()
    .then(function (obj) {
        console.log('DB connection established.')
        obj.done(); // success, release the connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
    });

module.exports = db;
