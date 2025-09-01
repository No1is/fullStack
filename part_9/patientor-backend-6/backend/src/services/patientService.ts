import { NonSensitivePatient, Patient, NewPatient } from '../types/types';
import data from '../data/patients';
import { v1 as uuid } from 'uuid'

const getNonSsnPatients = (): NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
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

export default { getNonSsnPatients, addNewPatient }