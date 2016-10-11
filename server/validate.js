// This module provides strict checking for all attributes
// that gets passed to the req.body from the post requests

const _ = require('lodash');

exports.login = function (obj) {
  return (  _.has(obj, 'email')
        &&  _.has(obj, 'password')
  );
}

exports.association = function (obj) {
  return (  _.has(obj,'name')
        &&  _.has(obj, 'initials')
        &&  _.has(obj, 'location')
        &&  _.has(obj, 'link')
        &&  _.has(obj, 'email')
        &&  _.has(obj, 'password')
  );
};

exports.student = function (obj) {
  return (  _.has(obj, 'firstName')
        &&  _.has(obj, 'lastName')
        &&  _.has(obj, 'email')
        &&  _.has(obj, 'department')
        &&  _.has(obj, 'password')
  );
}

exports.event = function (obj) {
  return (  _.has(obj,'name')
        &&  _.has(obj, 'associationId')
        &&  _.has(obj, 'associationName')
        &&  _.has(obj, 'startDate')
        &&  _.has(obj, 'endDate')
        &&  _.has(obj, 'startHour')
        &&  _.has(obj, 'endHour')
        &&  _.has(obj, 'location')
        &&  _.has(obj, 'imgage')
        &&  _.has(obj, 'description')
  );
};
