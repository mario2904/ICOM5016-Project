var sg = require('./index');
var helper = require('sendgrid').mail;

module.exports = function(first_name, last_name, college, email) {

  var from_email = new helper.Email('espotter.0@gmail.com');
  var to_email = new helper.Email(email);
  var subject = `Welcome to E-Spotter! ${first_name}!`; //This replales the subject tag
  var content = new helper.Content('text/html',' ');//this replaces the body tag

  var mail = new helper.Mail(from_email, subject, to_email, content);
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-first_name-', first_name));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-last_name-', last_name));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-college-', college));
  mail.setTemplateId('8f221281-1746-4e70-abee-ac5353bf941a');


  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });

}
