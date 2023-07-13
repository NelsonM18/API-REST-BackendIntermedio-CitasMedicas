import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },

    room: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export const DoctorModel = mongoose.model('Doctor', DoctorSchema);

// Metodos del modelo
export const getDoctors = () => DoctorModel.find();
export const getDoctorById = (id: string) => DoctorModel.findById(id);
export const getDoctorByName = (fullnameDoctor: string, emailDoctor: string) => DoctorModel.findOne({ fullname: fullnameDoctor, email: emailDoctor });
export const createDoctor = (values: Record<string, any>) => new DoctorModel(values).save();
export const updateDoctor = (id: string, values: Record<string, any>) => DoctorModel.findByIdAndUpdate(id, values);
export const deleteDoctorById = (id: string) => DoctorModel.findByIdAndDelete(id);