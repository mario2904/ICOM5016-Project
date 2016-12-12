import validate from 'validate.js';
import moment from 'moment';

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

// Custom validator.
validate.validators.acceptTerms = function(value, options, key, attributes) {
  return (value) ? null : "^You need to accept the Terms and Conditions.";
};

export const create_student = {
  first_name: {
    presence: true,
    length: {
      minimum: 2
    }
  },
  last_name: {
    presence: true,
    length: {
      minimum: 2
    }
  },
  email: {
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 8
    }
  },
  confirm_password: {
    presence: true,
    equality: "password"
  },
  birthdate: {
    presence: true,
    datetime: {
      dateOnly: true,
      latest: moment.utc().subtract(18, 'years'),
      message: "^You need to be atleast 18 years old"
    }
  },
  gender: {
    presence: true
  },
  hometown: {
    presence: true
  },
  college: {
    presence: true
  },
  major: {
    presence: true
  },
  bio: {
    presence: true
  },
  terms: {
    acceptTerms: true
  }
};

export const create_association = {
  association_name: {
    presence: true
  },
  initials: {
    presence: true
  },
  email: {
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 8
    }
  },
  confirm_password: {
    presence: true,
    equality: "password"
  },
  location: {
    presence: true
  },
  page_link: {
    url: true
  },
  bio: {

  }
};
export default validate;
