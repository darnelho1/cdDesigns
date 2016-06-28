"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var PORT = process.env.PORT;
var emailPassword = process.env.PASSWORD;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));
app.use(bodyParser());


app.get('*', function(request, response) {
  // console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});


app.post('/contactFormSend', function (req, res) {
  var form = req.body.info;
  console.log(form);
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "cddesignsmailer@gmail.com",
          pass: emailPassword
      }
  });

  //Mail options
  mailOpts = {
      from: form.firstName + ' ' +  form.lastName + '; '+ form.email + '', //grab form data from the request body object
      to: 'berning.corey@gmail.com',
      subject: 'C&D Designs Contact Form',
      html: form.businessName + '<br>' +form.currentWebsite + '<br><br>' + form.message + '<br><br>' + form.firstName + ' ' +  form.lastName + '<br>' + form.number  + '<br>' + form.email
  };
  console.log(mailOpts);

  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
        console.log(error);
        var data = {
          message: 'Sorry there was an issue.<br> Please try submitting your message again. Thank you.',
          flag: false
        };
        res.send(data);
      }
      //Yay!! Email sent
      else {
        var data = {
          message: 'Thank you For your interest in C&D Designs.<br> We have received your message and will be in contact shortly.',
          flag: true
        };
        console.log('sent');
        res.send(data);
      }
  });
});




app.listen(PORT, function() {
  console.log('server started');
  console.log('listening on PORT: ', + PORT);
});
