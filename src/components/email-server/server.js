const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.use(express.json());

// Handler for the POST request
app.post('/send-email', (req, res) => {
  console.log('Received request to send email:', req.body);

  const { replyTo, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.MONITORING_EMAIL,
    subject: `[From WL website] ${subject || '<No Subject>'}`,
    text: `From: ${replyTo || '<No Reply Address>'}\n\n${message || '<No Content>'}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email', details: error.message });
    } else {
        console.log('Email sent:', info.response);
        res.status(200).header({
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Access-Control-Allow-Credentials': true,
        }).send('Email sent successfully');
    }
  });
});

exports.emailHandler = serverless(app);