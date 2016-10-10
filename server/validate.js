// This module provides strict checking for all attributes
// necessary to create a new class of associations or student.
const _ = require('lodash');

exports.login = function (obj) {
  return (  _.has(obj, 'email')
        &&  _.has(obj, 'password')
  );
}

exports.association = function (obj) {
  console.log('Association: ',obj);
  return (  _.has(obj,'name')
        &&  _.has(obj, 'initials')
        &&  _.has(obj, 'location')
        &&  _.has(obj, 'link')
        &&  _.has(obj, 'email')
        &&  _.has(obj, 'password')
  );
};

exports.student = function (obj) {
  console.log('Student: ', obj);
  return (  _.has(obj, 'firstName')
        &&  _.has(obj, 'lastName')
        &&  _.has(obj, 'email')
        &&  _.has(obj, 'department')
        &&  _.has(obj, 'password')
  );
}

exports.event = function (obj) {
  console.log('Association: ',obj);
  return (  _.has(obj,'name')
        &&  _.has(obj, 'association')
        &&  _.has(obj, 'startDate')
        &&  _.has(obj, 'endDate')
        &&  _.has(obj, 'startHour')
        &&  _.has(obj, 'endHour')
        &&  _.has(obj, 'location')
        &&  _.has(obj, 'img')
  );
};
