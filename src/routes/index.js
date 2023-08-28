const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const contentHTML = `
            <h1>User Information</h1>
            <ul>
                <li>Username: ${name}</li>
                <li>User Email: ${email}</li>
                <li>PhoneNumber: ${phone}</li>
            </ul>
            <p>${message}</p>
        `;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'parkinglocation80@gmail.com',
                pass: 'xhbodxnzuxojocal',
            },
            tls: {
                rejectUnauthorized: false
            }
            
        });

        let info = await transporter.sendMail({
            from: 'parkinglocation80@gmail.com',
            to: 'isabelsofiabl200517@gmail.com', // Cambia esto al correo del destinatario
            subject: 'Website Contact Form',
            html: contentHTML,
        });

        console.log('Message sent: %s', info.messageId);

        res.redirect('/success.html');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred while sending the email.');
    }
});
module.exports = router;


