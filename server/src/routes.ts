import express from 'express';
import nodemailer from 'nodemailer';
import { send } from 'process';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodeMailerAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodeMailerAdapter
    ) 

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })
    return res.status(201).send();
})