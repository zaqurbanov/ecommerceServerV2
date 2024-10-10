const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // SendGrid API açarını saxlayın

const sendEmails = async (req, res) => {
    try {
        // Bazadan bütün abunəçiləri əldə edirik
        const subscribers = await Subscriber.find({});
        const emails = subscribers.map(subscriber => subscriber.email);

        const msg = {
            to: emails,
            from: 'your-email@example.com',  // Göndərən email
            subject: 'Newsletter',
            text: 'This is your weekly newsletter',
        };

        await sgMail.sendMultiple(msg);  // Bir neçə emailə göndəririk
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending emails' });
    }
};

module.exports = sendEmails;
