const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,    // your Gmail address
    pass: process.env.GMAIL_PASS,    // App Password (not your normal password)
  },
});

async function sendMail({ to, subject, text, html, replyTo, from }) {
  const mailFrom = from || process.env.MAIL_FROM || process.env.GMAIL_USER;
  const opts = {
    from: mailFrom,
    to,
    subject,
    text,
    html,
    replyTo,
  };
  return transporter.sendMail(opts);
}

function generateOtp(length = 6) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

async function sendOtp({ to, otp, minutesValid = 10 }) {
  const code = otp || generateOtp(6);
  const subject = 'Your verification code';
  const text = `Your OTP is: ${code}\nIt will expire in ${minutesValid} minutes.\n\nIf you did not request this, please ignore.`;
  await sendMail({ to, subject, text });
  return { otp: code };
}

module.exports = { sendMail, sendOtp };
