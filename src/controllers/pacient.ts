import express from 'express';
import { createPacient, deletePacientById, getPacientByDocument, getPacientById, getPacients } from '../db/pacient';

export const getAllPacients = async (req: express.Request, res: express.Response) => {
    try {
        const pacients = await getPacients();

        return res.status(200).json(pacients);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createdPacient = async (req: express.Request, res: express.Response) => {
    try {
        const { fullname, document, age, phone} = req.body;

        // Validar Campos Vacios
        if(!fullname || !document || !age || !phone) {
            return res.sendStatus(400);
        }

        // Validar si Paciente Existe
        const pacientExist = await getPacientByDocument(document);

        if (pacientExist) {
            console.log('Paciente existe');

            return res.sendStatus(400);
        }

        // Crear Paciente
        const pacient = await createPacient({
            fullname,
            document,
            age,
            phone
        });

        return res.status(200).json(pacient).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updatedPacient = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { fullname, document, age, phone } = req.body;

        // Validar Campos Vacios
        if(!fullname || !document || !age || !phone) {
            return res.sendStatus(400);
        }

        // Actualizar Paciente por Id
        const pacient = await getPacientById(id);

        pacient.fullname = fullname;
        pacient.document = document;
        pacient.age = age;
        pacient.phone = phone;

        await pacient.save();

        return res.status(200).json(pacient).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deletedPacient = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletePacient = await deletePacientById(id);

        return res.json(deletePacient);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}