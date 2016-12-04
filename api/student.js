const router = require('express').Router();
const db1 = require('../db');

// GET - Get Student Info
// params:
//    id: uuid
// response:
//    firstName: string
//    lastName: string
//    major: string
//    interestedEvents: [] uuid
//    followedAssociations: [] uuid
//    profileImage: string
//    bio: string
router.get('/:id', (req, res) => {
  console.log(req.params);
  // Destructure params
  const { id } = req.params;
  // TODO: Check if it is in the db...
  const responseDB = {};
  //
  db1.one("SELECT first_name, last_name, gender, hometown, college, major, image_path, bio, email \
            FROM students natural join account natural join images \
            WHERE user_id = ${idused}", {idused: id})
      .then(function (data) {
          // success;
          responseDB.eventInfo = data;
          db1.any("SELECT event_id, event_name, association_name, start_date, end_date, start_time, end_time, room, image_path \
                    FROM interested natural join events natural join images natural join location, associations \
                    WHERE user_id = ${idused} and events.association_id = associations.association_id", {idused: id})
              .then(function (data) {
                  // success;
                  responseDB.interestedEvents = data;
                  db1.any("SELECT association_id, association_name, initials, image_path \
                            FROM followed_associations natural join associations natural join images \
                            WHERE user_id = ${idused}", {idused: id})
                      .then(function (data) {
                          // success;
                          responseDB.followedAssociations = data;
                          const { first_name, last_name, gender, hometown, college, major, image_path, bio, email } = responseDB.eventInfo;
                          const response = {
                            first_name,
                            last_name,
                            gender,
                            hometown,
                            college,
                            major,
                            image_path,
                            bio,
                            email,
                            interestedEvents: responseDB.interestedEvents,
                            followedAssociations: responseDB.followedAssociations
                          };
                          // Send Student Information
                          console.log('Success: Get Student Information');
                          console.log("DB");
                          console.log(response);

                          res.json(response);


                          console.log('worked');
                      })
                      .catch(function (error) {
                          // error;
                          console.log('Error: Followed Associations')
                      });

                  console.log('worked');
              })
              .catch(function (error) {
                  // error;
                  console.log('Error: Interested Events')
              });

          console.log('worked');
      })
      .catch(function (error) {
          // error;
          console.log('Error Student Information')
      });

});

module.exports = router;
