import * as nodemailer from 'nodemailer';

export async function sendEmailVerification(customerMail: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: 'Yahoo',
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const verificationUrl = process.env.VERIFICATION_URL + token;

    const mailData = {
        from: process.env.EMAIL_USER,
        to: customerMail,
        subject: 'Verify Email',
        text: `Verify Email by following link: ${verificationUrl}`,


    };

    await transporter.sendMail(mailData);

}