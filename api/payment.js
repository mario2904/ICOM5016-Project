const router = require('express').Router();
const db1 = require('../db');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});


const payment_confirmation = require('../mail/payment_confirmation');

router.post('/', requireAuth, (req, res, next) => {
  // Destructure params
  const { id } = req.user;
  const ammount = '1.00'
  const transaction_text = `Paid Entrance Fee of $${ammount}.`;


  console.log(req.body);

  const values = req.body;
  const { first_name, last_name, association_id, event_name, association_name } = req.body;
  values.transaction_text = transaction_text;
  values.ammount = ammount;
  values.user_id = id;

  db1.task(function* (t) {
    let { transaction_id } = yield t.one(`
      INSERT INTO transactions (transaction_text, ammount, credit_card_num, expiration_date, security_code, first_name, last_name, address_line_1, address_line_2, city, state, post_code, country, time_stamp, user_id, association_id, event_id)
      VALUES ($[transaction_text], $[ammount], $[credit_card_num], $[expiration_date], $[security_code], $[first_name], $[last_name], $[address_line_1], $[address_line_2], $[city], $[state], $[post_code], $[country], CURRENT_TIMESTAMP, $[user_id], $[association_id], $[event_id])
      RETURNING transaction_id`, values);
    let to_email = yield t.one(`
      SELECT email
      FROM account natural join students
      WHERE user_id = $[id]`, {id});
    let association_email = yield t.one(`
      SELECT email
      FROM account natural join associations
      WHERE association_id = $[association_id]`, {association_id});
    return {transaction_id, student_email: to_email.email, association_email: association_email.email};
    })

    .then(data => {

      const { transaction_id, student_email, association_email } = data;

      console.log(data);
      // payment_confirmation(first_name, last_name, student_email, event_name, association_name, association_email, ammount, transaction_id);
      console.log('Success insert transactions');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Failed insert Transactions');
      next(error);
    });

});

module.exports = router;
