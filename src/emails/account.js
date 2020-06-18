const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    try {
        sgMail.send({
            to: email,
            from: 'frandesmyrce@gmail.com',
            subject: 'Welcome to me',
            text: `Welcome to the app, ${name}.`,
        }); 
    } catch (error) {
        throw new Error('failed to send email')
    }
    
};

const sendCancelation = (email, name) => {
    try {
        sgMail.send({
            to: email,
            from: 'frandesmyrce@gmail.com',
            subject: 'Why go? No Go!',
            text: `why Go ${name}, not go come back!`
        })
    } catch (error) {
        throw new Error('failed to send email')
    }
    
}
module.exports = {
    sendWelcomeEmail,
    sendCancelation
}