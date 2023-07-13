import express from "express";
import { createMedical, deleteMedicalById, getMedials, getMedicalById } from "../db/medical";

export const getAllMedicals = async (req: express.Request, res: express.Response) => {
    try {
        const medicals = await getMedials();

        return res.status(200).json(medicals);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createdMedical = async (req: express.Request, res: express.Response) => {
    try {
        const { idDoctor, idPacient, idSpeciality, date } = req.body;

        // Validar Campos Vacios
        if (!idDoctor || !idPacient || !idSpeciality || !date) {
            return res.sendStatus(400);
        }

        // Crear Cita
        const medical = await createMedical({
            idDoctor,
            idPacient,
            idSpeciality,
            date
        });

        return res.status(200).json(medical).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updatedMedical = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { idDoctor, idPacient, idSpeciality, date } = req.body;

        // Validar Campos Vacios
        if (!idDoctor || !idPacient || !idSpeciality || !date) {
            return res.sendStatus(400);
        }

        // Actualizar Cita por Id
        const medical = await getMedicalById(id);

        medical.idDoctor = idDoctor;
        medical.idPacient = idPacient;
        medical.idSpeciality = idSpeciality;
        medical.date = date;

        await medical.save();

        return res.status(200).json(medical).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteMedical = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteMedical = await deleteMedicalById(id);

        return res.json(deleteMedical);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}