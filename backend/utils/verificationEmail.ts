// import * as nodemailer from 'nodemailer';
//
//
// // TODO: funktioniert nicht warten bis eigene Domain
// export async function sendEmailVerification(customerMail: string, token: string) {
//     const transporter = nodemailer.createTransport({
//
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//         debug: false,
//         logger: true
//     })
//
//     const verificationUrl = process.env.VERIFICATION_URL + token;
//
//     const mailData = {
//         from: process.env.EMAIL_USER,
//         to: customerMail,
//         subject: 'Verify Email',
//         text: `Verify Email by following link: ${verificationUrl}`,
//
//
//     };
//
//     // await transporter.sendMail(mailData);
//
//
//     transporter.sendMail(mailData, function(error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
//
// }