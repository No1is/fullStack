import { NonSensitivePatient, Patient, NewPatient, Gender } from '../types/types';
import data from '../data/patients';
import { v1 as uuid } from 'uuid'

const getNonSsnPatients = (): NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: gender as Gender,
        occupation
    }));
};

const addNewPatient = (patient: NewPatient): Patient => {
    const addPatient = {
        id: uuid(),
        ...patient
    }
    return addPatient
}

const getPatientDetails = (id: string): Patient => {
    const patient = data.find(p => p.id === id)
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`)
    }

    return {
        ...patient,
        gender: patient.gender as Gender,
        entries: []
    }
}

export default { getNonSsnPatients, addNewPatient, getPatientDetails }