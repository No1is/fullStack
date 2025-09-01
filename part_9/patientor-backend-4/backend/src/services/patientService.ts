import { NonSensitivePatient } from '../types/types';
import data from '../data/patients';

const getNonSsnPatients = (): NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default { getNonSsnPatients }