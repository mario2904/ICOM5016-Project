const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const router = require('express').Router();
const db1 = require('../db');

router.get('/', requireAuth, (req, res) => {
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  const responseDB = {};
  db1.any('SELECT event_id, event_name, association_name, time_stamp, image_path \
            FROM associations as A, (events as E natural join images), followed_associations as FA, students as S \
            WHERE E.association_id = A.association_id and FA.association_id = E.association_id and FA.user_id = S.user_id and S.user_id = ${idused} \
            ORDER BY time_stamp DESC', {idused: id})
      .then(function (data) {
        responseDB.eventsCreated = data;

        db1.any("SELECT E.event_id, E.event_name, E.association_id, notification_name, notification_text, date_sent, image_path \
                  FROM notifications as N, events as E, (associations as A natural join images), followed_associations as FA \
                  WHERE N.event_id = E.event_id and A.association_id = E.association_id and A.association_id = FA.association_id and user_id = ${idused} \
                  ORDER BY date_sent DESC", {idused: id})
            .then(function (data) {
            responseDB.updates = data;
            console.log(data);
            const response =[];
            //breakdown for events
            for (let i = 0; i < responseDB.eventsCreated.length; i++) {

                // Destructure DB information
                const { event_id, event_name, association_name, time_stamp, image_path } = responseDB.eventsCreated[i];
                const summary = association_name + " has created a new event: ";
                const extraText = event_name;
                const singleEvent = {

                  image: image_path,
                  summary,
                  date: time_stamp,
                  extraText
                }

                response.push(singleEvent);
            }

            for (let i = 0; i < responseDB.updates.length; i++) {

                // Destructure DB information
                const { event_id, event_name, association_id, notification_name, notification_text,date_sent, image_path } = responseDB.updates[i];
                const summary = event_name + " has a new update: ";
                const extraText = notification_text;
                const singleUpdate = {

                  image: image_path,
                  summary,
                  date: date_sent,
                  extraText
                }

                response.push(singleUpdate);
            }

            res.json(response);

            })
            .catch(function (error) {
              // error;
              console.log('Updates Info Failed')
            });



      })
      .catch(function (error) {
        // error;
        console.log('Events Created Info Failed')
      });

});

router.get('/events', requireAuth, (req, res) => {
  console.log(req.params);
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  db1.any("SELECT event_id, event_name,events.association_id, association_name, start_date, end_date, start_time, end_time, room, image_path \
            FROM interested natural join events natural join images natural join location, associations \
            WHERE user_id = ${idused} and events.association_id = associations.association_id", {idused: id})

      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        // error;
        console.log('Events Info Home Failed')
      });
});

router.get('/associations', requireAuth, (req, res) => {
  console.log(req.params);
  // After auth check req.user.id = id of user.
  const { id } = req.user;

  db1.any("SELECT association_id, association_name, initials, image_path \
            FROM followed_associations natural join associations natural join images \
            WHERE user_id = ${idused}", {idused: id})

      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        // error;
        console.log('Events Info Home Failed')
      });
});

module.exports = router;
