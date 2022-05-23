import express from 'express';
import nodemailer from 'nodemailer';
import { send } from 'process';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d87dee259f59d2",
        pass: "cc817041c9b342"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository
    ) 

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    // transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'João <joperigo@gmail.com>',
    //     subject: 'Novo feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #333333;">`,
    //         `<p>Tipo do feedback: ${type}</p>`,
    //         `<p>Comentário: ${comment}</p>`,
    //         `</div>`,
    //     ].join('\n')
    // })

    return res.status(201).send();
})