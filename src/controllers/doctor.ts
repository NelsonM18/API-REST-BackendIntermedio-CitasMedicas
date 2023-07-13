import express from "express";
import { getDoctors, createDoctor, deleteDoctorById, getDoctorByName, getDoctorById } from "../db/doctor";

export const getAllDoctors = async (req: express.Request, res: express.Response) => {
    try {
        const doctors = await getDoctors();

        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createdDoctor = async (req: express.Request, res: express.Response) => {
    try {
        const { fullname, speciality, room, email } = req.body;

        // Validar Campos Vacios 
        if (!fullname || !speciality || !room || !email) {
            return res.sendStatus(400);
        }

        // Validar si Doctor Existe
        const doctorExist = await getDoctorByName(fullname, email);

        if (doctorExist) {
            console.log('Doctor existe');

            return res.sendStatus(400);
        }

        // Crear Usuario
        const doctor = await createDoctor({
            fullname,
            speciality,
            room,
            email
        });

        return res.status(200).json(doctor).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updatedDoctor = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;
        const { fullname, speciality, room, email } = req.body;

        // Validar Campos Vacios
        if (!fullname || !speciality || !room || !email) {
            return res.sendStatus(400);
        }

        // Actualizar Doctor por Id
        const doctor = await getDoctorById(id);

        doctor.fullname = fullname;
        doctor.speciality = speciality;
        doctor.room = room;
        doctor.email = email;

        await doctor.save();

        return res.status(200).json(doctor).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteDoctor = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteDoctor = await deleteDoctorById(id);

        return res.json(deleteDoctor);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}