var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
module.exports = sg;
