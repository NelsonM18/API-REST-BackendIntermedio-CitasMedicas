import mongoose, { model } from "mongoose";

const PacientShema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

export const PacientModel = mongoose.model('Pacient', PacientShema);

// Metodos del modelo
export const getPacients = () => PacientModel.find();
export const getPacientById = (id: string) => PacientModel.findById(id);
export const getPacientByDocument = (documentPacient: string) => PacientModel.findOne({document: documentPacient});
export const createPacient = (values: Record<string, any>) => new PacientModel(values).save();
export const updatePacient = (id: string, values: Record<string, any>) => PacientModel.findByIdAndUpdate(id, values);
export const deletePacientById = (id: string) => PacientModel.findByIdAndDelete(id);