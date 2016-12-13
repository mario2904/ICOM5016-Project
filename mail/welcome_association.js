var sg = require('./index');
var helper = require('sendgrid').mail;
module.exports = function(email, association_name ){

const association_name="SHPE"
  var from_email = new helper.Email('espotter.0@gmail.com');
  var to_email = new helper.Email(email);
  var subject = `Welcome to E-Spotter! ${association_name}!`; //This replales the subject tag
  var content = new helper.Content('text/html',' ');
    // 'text/html', `<p style=color:"black">Hi ${first_name} ${last_name}, congrats on your new account.</p>
    // <p style=color:"black">Awesome, now you can track the events of your favorite associations at ${college}.
    // Hope you enjoy our app.<p>`);
    //this replaces the body tag

  var mail = new helper.Mail(from_email, subject, to_email, content);
  mail.personalizations[0].addSubstitution(
    new helper.Substitution('-association_name-', association_name));
  mail.setTemplateId('f9423e0b-f236-4a1e-b770-6b52f39c1a8e');

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
