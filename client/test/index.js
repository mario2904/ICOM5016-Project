// Models
const { Association, Student, Event } = require('../model');

// Dummy Data
const { associations, students, events } = require('./dummy-data');

// Utils
const uuid = require('node-uuid');

exports.fillDummyData = function (db) {
  // Create Associations
  for (let association of associations) {
    const { name, initials, location, link, email, password, image } = association;
    const id = uuid.v4();
    db.association[id] = new Association(id, name, initials, location, link, email, password, image);
    // Initialize association's active and past events Lists
    db.activeEvents[id] = [];
    db.pastEvents[id] = [];
    // Initialize association's Sponsors Lists
    db.associationSponsors[id] = [];
    // Initialize association's followers list
    db.followers[id] = [];
  }
  // Create Students
  for (let student of students) {
    const { firstName, lastName, age, gender, hometown, college, major, email, password } = student;
    const id = uuid.v4();
    db.student[id] = new Student(id, firstName, lastName, age, gender, hometown, college, major, email, password);
    // Initialize student's interestedEvents list
    db.interestedEvents[id] = [];
    // Initialize student's followed associations list
    db.followedAssociations[id] = [];
  }
  // Create events
  for (let event of events) {
    for (var key in db.association) {
      if (db.association.hasOwnProperty(key)) {

        let association = db.association[key];
        if (event.associationName === association.name) {
          const { name, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink } = event;
          const id = uuid.v4();
          db.event[id] = new Event(id, name, association.id, associationName, startDate, endDate, startTime, endTime, location, image, description, registrationLink);
          // Update active Lists
          db.activeEvents[association.id].push(id);
        }
      }
    }
  }
}

exports.createSchema = function (db) {
  // One - to - One
  db.student = {};                  // Maps student id to Student Object Model
  db.association = {};              // Maps association id to Association Object Model
  db.event = {};                    // Maps event id to Event Object Model
  db.sponsors = {};                 // Maps sponsor id to Sponsor Object Model
  // One - to - Many
  db.interestedEvents = {};         // Maps student id to list of event id's
  db.followedAssociations = {};     // Maps student id to list of association id's

  db.associationSponsors = {};      // Maps association id to list of sponsors
  db.activeEvents = {};             // Maps association id to list of their active events
  db.pastEvents = {};               // Maps association id to list of their past events
  db.followers = {};                // Maps association id to list of their followers
}
