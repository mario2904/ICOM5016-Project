const router = require('express').Router();
const db1 = require('../db');

router.get('/reviews', (req, res) => {
  console.log(req.params);
  const id = '1';
  const response = [];
  db1.any("SELECT review_id, first_name, last_name, image_path, review, date_created, event_name, rating \
            FROM review natural join students natural join images, events \
            WHERE association_id= ${idused} and events.event_id = review.event_id", {idused: id})

      .then(function (data) {
        console.log("TTTTTTT");
        //console.log(data);
        for (let i = 0; i < data.length; i++) {

            // Destructure DB information
            const { review_id, first_name, last_name, image_path, review,date_created, event_name, rating } = data[i];
            const summary = first_name + " "+ last_name + " has reviewed your event: " + event_name;
            const extraText = review;
            const singleReview = {

              image: image_path,
              summary,
              date: date_created,
              extraText
            }
            console.log(singleReview);
            response.push(singleReview);
        }
        //console.log(response);
        res.json(response);
      })
      .catch(function (error) {
        // error;
        console.log('Events Info Home-Association Failed')
      });
});

router.get('/events', (req, res) => {
  console.log(req.params);
  const id = '1';

  db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id= ${idused}", {idused: id})

      .then(function (data) {

        console.log(data);
        res.json(data);
      })
      .catch(function (error) {
        // error;
        console.log('All Events Home-Association Failed')
      });
});

module.exports = router;
