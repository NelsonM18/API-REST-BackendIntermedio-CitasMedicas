import mongoose from "mongoose";

const MedicalShema = new mongoose.Schema({
    idDoctor: {
        type: String,
        required: true
    },
    idPacient: {
        type: String,
        required: true
    },
    idSpeciality: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export const MedicalModel = mongoose.model('Medical', MedicalShema);

// Metodos del modelo
export const getMedials = () => MedicalModel.find();
export const getMedicalById = (id: String) => MedicalModel.findById(id);
export const createMedical = (values: Record<string, any>) => new MedicalModel(values).save();
export const updateMedical = (id: string, values: Record<string, any>) => MedicalModel.findByIdAndUpdate(id, values);
export const deleteMedicalById = (id: string) => MedicalModel.findByIdAndDelete(id);