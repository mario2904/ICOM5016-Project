var sg = require('./index');
var helper = require('sendgrid').mail;

module.exports = function(first_name, last_name, student_email, event_name, association_name, association_email, amount, transaction_id) {

  var from_email = new helper.Email('espotter.0@gmail.com');
  // var to_email = new helper.Email('gracianylebron@gmail.com');
  var to_email = new helper.Email(student_email);

  // const first_name ="Graciany";
  var subject = `Payment Comfirmation 11!!!!! ${first_name}!`; //This replales the subject tag

  var content = new helper.Content('text/html', ' ');

  // const last_name ="Lebron";
  // const event_name ="All Nighter Study Session";
  // const association_name="SHPE";
  // const association_email="shpe@upr.edu";
  // const amount ="$5.99";
  // const transaction_id="1";
  var mail = new helper.Mail(from_email, subject, to_email, content);
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-amount-', amount));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-first_name-', first_name));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-last_name-', last_name));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-event_name-', event_name));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-association_name-', association_name));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-association_email-', association_email));
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-transaction_id-', transaction_id));

  mail.setTemplateId('6f9ca928-d991-4527-82c0-f88d5ba7875e'); // need to create new template because of Api key change

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
