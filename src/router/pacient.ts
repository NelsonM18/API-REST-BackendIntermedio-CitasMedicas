import express from "express";
import { createdPacient, deletedPacient, getAllPacients, updatedPacient } from "../controllers/pacient";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {

    router.get('/pacients', isAuthenticated, getAllPacients);
    router.post('/pacient', isAuthenticated, createdPacient);
    router.patch('/pacient/:id', isAuthenticated, updatedPacient);
    router.delete('/pacient/:id', isAuthenticated, deletedPacient);
}