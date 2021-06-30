const nodemailer = require('nodemailer');

/*
* Most of the following code is taken from NodeMailer documentation and sightly edited to match project requirements
* Source: https://nodemailer.com
*/
const send = async (target, subject, textBody, htmlBody) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USERNAME, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USERNAME}>`, // sender address
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