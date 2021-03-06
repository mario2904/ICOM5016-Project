// This module provides strict checking for all attributes
// that gets passed to the req.body from the post requests

const _ = require('lodash');

exports.login = function (obj) {
  return (  _.has(obj, 'email')
        &&  _.has(obj, 'password')
        &&  _.has(obj, 'role')
  );
}

exports.association = function (obj) {
  return (  _.has(obj, 'association_name')
        &&  _.has(obj, 'initials')
        &&  _.has(obj, 'location')
        &&  _.has(obj, 'page_link')
        &&  _.has(obj, 'email')
        &&  _.has(obj, 'password')
  );
};

exports.student = function (obj) {
  return (  _.has(obj, 'first_name')
        &&  _.has(obj, 'last_name')
        &&  _.has(obj, 'birthdate')
        &&  _.has(obj, 'gender')
        &&  _.has(obj, 'hometown')
        &&  _.has(obj, 'college')
        &&  _.has(obj, 'email')
        &&  _.has(obj, 'major')
        &&  _.has(obj, 'password')
        &&  _.has(obj, 'bio')
  );
}

exports.event = function (obj) {
  return (  _.has(obj,'name')
        &&  _.has(obj, 'associationId')
        &&  _.has(obj, 'associationName')
        &&  _.has(obj, 'startDate')
        &&  _.has(obj, 'endDate')
        &&  _.has(obj, 'startTime')
        &&  _.has(obj, 'endTime')
        &&  _.has(obj, 'location')
        &&  _.has(obj, 'image')
        &&  _.has(obj, 'description')
        &&  _.has(obj, 'registrationLink')
  );
};
