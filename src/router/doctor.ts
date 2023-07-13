import express from 'express';
import { createdDoctor, deleteDoctor, getAllDoctors, updatedDoctor } from '../controllers/doctor';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {

    router.get('/doctors', isAuthenticated, getAllDoctors);
    router.post('/doctor', isAuthenticated, createdDoctor);
    router.patch('/doctor/:id', isAuthenticated, updatedDoctor);
    router.delete('/doctor/:id', isAuthenticated, deleteDoctor);
}