import express from 'express';
import { createdMedical, deleteMedical, getAllMedicals, updatedMedical } from '../controllers/medical';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {

    router.get('/medicals', isAuthenticated, getAllMedicals);
    router.post('/medical', isAuthenticated, createdMedical);
    router.patch('/medical/:id', isAuthenticated, updatedMedical);
    router.delete('/medical/:id', isAuthenticated, deleteMedical);
}