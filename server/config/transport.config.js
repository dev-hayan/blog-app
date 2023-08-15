const nodemailer = require('nodemailer'); // For sending confirmation emails


const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'abdul.hayan@devsinc.com',
        pass: 'xfbifwehhrxuciwj'
    }
};
const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;
