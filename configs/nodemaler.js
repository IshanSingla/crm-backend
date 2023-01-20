var nodemailer = require("nodemailer");

// Send e-mail using SMTP
// mailOptions.subject = "Nodemailer SMTP transporter";
var smtpTransporter = nodemailer.createTransport({
  port: 465,
  host: process.env.AWS_HOST,
  secure: true,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD,
  },
  debug: true,
});

const mailInitiator = async (mailOptions) => {
  try {
    return smtpTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        return info;
      }
    });
  } catch (err) {
    return err;
  }
};

module.exports = { mailInitiator };
