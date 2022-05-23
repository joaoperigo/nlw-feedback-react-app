import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d87dee259f59d2",
        pass: "cc817041c9b342"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'João <joperigo@gmail.com>',
            subject,
            html: body,
        });
    }
}