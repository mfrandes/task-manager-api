const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'frandesmyrce@gmail.com',
        subject: 'Welcome to me',
        text: `Welcome to the app, ${name}.`,
    });
};

const sendCancelation = (email, name) => {
    sgMail.send({
        to: email,
        from: 'frandesmyrce@gmail.com',
        subject: 'Why go? No Go!',
        text: `why Go ${name}, not go come back!`
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelation
}