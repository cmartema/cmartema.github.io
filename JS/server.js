const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});



app.use(bodyParser.urlencoded({ extended: true }));
app.post('/send-message', (req, res) => {
    let {fullName, email, phone, subject, message} = req.body;
    let date = 'Date: ' + new Date().toLocaleString() + '\n';
    let data = `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}\n\n`;
    data = date + data;

    var mailOptions = {
        from: 'cmartema@gmail.com',
        to: 'cmartema@gmail.com',
        subject: 'Message from website',
        text: data
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send('There was an error. Please try again.');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    fs.appendFile('messages.txt', data, (err) => {
        if (err) {
            console.log(err);
            res.send('There was an error. Please try again.');
        } else {
            res.send('Message sent successfully!');
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
