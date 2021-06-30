const mailParticipationApproved = require('../../mail/template')
const nodemailer = require('nodemailer');

module.exports = {
    Mutation: {
        sendMail: async (_, args) => {
            const { from, name, subject, message } = args

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }, tls: {
                    rejectUnauthorized: false
                }
            });

            await transporter.sendMail({
                from: from,
                to: process.env.MAIL_USER,
                subject: 'Hermes - WildCodeSchool | Demande/Support',
                html: mailParticipationApproved({
                    name: name,
                    sujet: subject,
                    message: message,
                }),
            });

            return { OK: true, KO: false }
        }
    }
}