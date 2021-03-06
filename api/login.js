const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

const requireLogin = passport.authenticate('local', {session: false});

const router = require('express').Router();
const db = require('../db');

function generateToken(id, name, role) {
  const payload = {
    sub: id,
    name: name,
    role: role,
    iat: new Date().getTime()
  }
  return jwt.sign(payload, process.env.SECRET_KEY || 'SECRET');
}

// POST - Login
// body:
//    email: string
//    password: string
//    role: string (association | student)
// if auth:
//    {} user
//      id: string
//      name: string
//      role: string
// response:
//    id: uuid
router.post('/', requireLogin, (req, res) => {
  console.log(req.body);

  let table = '';
  let name = '';
  let id = '';
  switch (req.body.role) {
    case 'student':
      id = 'user_id'
      table = 'students';
      name = 'first_name';
      break;
    case 'association':
      id = 'association_id';
      table = 'associations';
      name = 'association_name';
      break;
    default:
      return res.status(400).send("Error: Login error. Role undefined.");
  }

  db.one(`
    SELECT ${id}, ${name}
    FROM account natural join ${table}
    WHERE account_id = $[account_id]`, {account_id: req.user.account_id})
    .then((data) => {
      const response = {
        id_token: generateToken(data[id], data[name], req.body.role),
        id: data[id],
        role: req.body.role,
        user_name: data[name]
      };
      return res.json(response);
    })
    .catch((error) => {
      return res.status(400).send("Error: Login error with DB");
    });
});

module.exports = router;
