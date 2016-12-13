const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const moment = require('moment');
const router = require('express').Router();
const db1 = require('../db');

router.get('/', requireAuth, (req, res, next) => {
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  const responseDB = {};
  db1.task(t => {
      return t.batch([
        t.any(`
          SELECT event_id, event_name, association_name, time_stamp, image_path
          FROM associations as A, (events as E natural join images), followed_associations as FA, students as S
          WHERE E.association_id = A.association_id and FA.association_id = E.association_id and FA.user_id = S.user_id and S.user_id = $[id]
          ORDER BY time_stamp DESC`, {id}),
        t.any(`
          SELECT E.event_id, E.event_name, E.association_id, notification_name, notification_text, date_sent, image_path
          FROM notifications as N, events as E, (associations as A natural join images), followed_associations as FA
          WHERE N.event_id = E.event_id and A.association_id = E.association_id and A.association_id = FA.association_id and user_id = $[id]
          ORDER BY date_sent DESC`, {id})
      ]);
    })
    .then(data => {
      console.log('Success: Updates Info');
      let events = data[0].map(event => {
        const { event_id, event_name, association_name, time_stamp, image_path } = event;
        return {
          image: image_path,
          summary: `${association_name} has created a new event: `,
          date: time_stamp,
          extraText: event_name
        };
      });
      let updates = data[1].map(update => {
        const { event_id, event_name, association_id, notification_name, notification_text, date_sent, image_path } = update;
        return {
          image: image_path,
          summary: `${event_name} has a new update: `,
          date: moment(date_sent).format("YYYY-MM-DD"),
          extraText: notification_text
        }
      });

      const response = events.concat(updates);
      res.json(response);
    })
    .catch(error => {
      console.log('Updates Info Failed');
      next(error);
    });

});

router.get('/events', requireAuth, (req, res) => {
  console.log(req.params);
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  db1.any(`
    SELECT event_id, event_name, events.association_id, association_name, start_date, end_date, start_time, end_time, event_location, image_path
    FROM interested natural join events natural join images, associations
    WHERE user_id = $[id] and events.association_id = associations.association_id`, {id})
    .then(data => {
      console.log('Success: Events Info Home');
      data.forEach(a => {
        a.start_date = moment(a.start_date).format("YYYY-MM-DD");
        a.end_date = moment(a.end_date).format("YYYY-MM-DD");

       });
      res.json(data);
    })
    .catch(error => {
      console.log('Events Info Home Failed');
      next(error);
    });
});

router.get('/associations', requireAuth, (req, res, next) => {
  console.log(req.params);
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  db1.any(`
    SELECT association_id, association_name, initials, image_path
    FROM followed_associations natural join associations natural join images
    WHERE user_id = $[id]`, {id})
    .then(data => {
      console.log('Success: Events Info Home');
      res.json(data);
    })
    .catch(error => {
      console.log('Events Info Home Failed');
      next(error);
    });
});

module.exports = router;
