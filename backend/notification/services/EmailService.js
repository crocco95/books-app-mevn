const nodemailer = require('nodemailer');
const emailConfig = require('../config/email.config');

/*
* The function send a main to a target (email address).
* Most of the following code is taken from NodeMailer documentation and sightly edited to match project requirements
* Source: https://nodemailer.com
*/
const send = async (target, subject, textBody, htmlBody) => {

    console.log(`[INFO] Preparing transporter ${emailConfig.server.host}`);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: emailConfig.server.host,
        port: emailConfig.server.port,
        secure: emailConfig.server.secure, // true for 465, false for other ports
        auth: {
            user: emailConfig.user.smtp_username, // generated ethereal user
            pass: emailConfig.user.smtp_password, // generated ethereal password
        },
    });

    console.log(`[INFO] Sending mail to ${target}`);

    // send mail with defined transport object
    return await transporter.sendMail({
        from: `"${emailConfig.user.smtp_name}" <${emailConfig.user.smtp_username}>`, // sender address
        to: target, // list of receivers
        subject: subject, // Subject line
        text: textBody, // plain text body
        html: htmlBody, // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
    send,
}