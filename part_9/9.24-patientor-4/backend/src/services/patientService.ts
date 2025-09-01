import { NonSensitivePatient, Patient, NewPatient, Gender, Entry } from '../types/types';
import patients from '../data/patients';
import { v1 as uuid } from 'uuid'

const getNonSsnPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
    const patient = patients.find(p => p.id === id)
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`)
    }

    return {
        ...patient,
        gender: patient.gender as Gender,
        entries: patient.entries as Entry[]
    }
}

export default { getNonSsnPatients, addNewPatient, getPatientDetails }