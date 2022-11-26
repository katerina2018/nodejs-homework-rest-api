const nodemailer = require("nodemailer");

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

async function sendRegisterEmail({ email, token }) {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  const url = `localhost:3000/api/users/verify/${token}`;

  const emailBody = {
    from: "info@example.com",
    to: email,
    subject: "Please verify your email",
    html: `<h1> Please open this link:  <a href="http://${url}"> link </a> to verify your email <h1>`,
    text: `Please open this link: ${url} to verify your email`,
  };

  const response = await transport.sendMail(emailBody);
}
module.exports = sendRegisterEmail;
