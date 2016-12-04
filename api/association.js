const router = require('express').Router();
const db1 = require('../db');


// GET - Association Information
// params:
//    id: uuid
// response
//    name: string
//    initials: string
//    location: string
//    link: string
//    email: string
//    profileImage: string
//    bio: string
//    sponsors: [] uuid
//    activeEvents: [] uuid
//    pastEvents: [] uuid
//    followers: [] uuid
router.get('/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  //
  const responseDB = {};

  db1.one("SELECT association_name, initials, room, page_link, email, image_path, bio \
          FROM associations natural join account natural join images natural join location\
          WHERE association_id = ${idused}", {idused: id})
      .then(function (data) {
          // success;
          responseDB.associationInfo = data
          db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
            FROM events as E, associations as A, images as I, location as L \
            WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id = ${idused} and is_live = 'yes'", {idused: id})
              .then(function (data) {
                responseDB.activeEvents = data;

                db1.any("SELECT event_id, E.event_name, A.association_name, A.association_id, start_date, end_date, start_time, end_time, room, image_path, description, registration_link \
                  FROM events as E, associations as A, images as I, location as L \
                  WHERE E.association_id = A.association_id and E.image_id = I.image_id and E.location_id = L.location_id and A.association_id = ${idused} and is_live = 'no'", {idused: id})
                    .then(function (data) {
                      responseDB.pastEvents = data;
                      db1.any("SELECT sponsor_name, image_path \
                          FROM association_sponsors natural join sponsors natural join images\
                          WHERE association_id = ${idused}", {idused: id})
                          .then(function (data) {
                            responseDB.sponsors = data;
                            db1.one("SELECT count(user_id) \
                                      FROM followed_associations \
                                      WHERE association_id = ${idused}", {idused: id})
                                .then(function (data) {
                                  responseDB.amountFollowed = data

                                  const { association_name, initials, room, page_link, email, image_path, bio } = responseDB.associationInfo;
                                  const response = {

                                    association_name,
                                    initials,
                                    room,
                                    page_link,
                                    email,
                                    image_path,
                                    bio,
                                    activeEvents: responseDB.activeEvents,
                                    pastEvents: responseDB.pastEvents,
                                    sponsors: responseDB.sponsors,
                                    followers: responseDB.amountFollowed

                                  }

                                  console.log('Success: Get All Associations Information');
                                  console.log(response);
                                  res.json(response);
                                  console.log('worked');
                                })
                                .catch(function (error) {
                                    // error;
                                    console.log('Error: Followers')
                                });

                          })
                          .catch(function (error) {
                              // error;
                              console.log('Error: Sponsors')
                          });

                    })
                    .catch(function (error) {
                        // error;
                        console.log('Error: PastEvents')
                    });

              })
              .catch(function (error) {
                  // error;
                  console.log('Error: LiveEvents')
              });


      })
      .catch(function (error) {
          // error;
          console.log('Error: Get AssociationInfo')
      });


});

module.exports = router;
