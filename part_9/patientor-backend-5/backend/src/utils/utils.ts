import { NewPatient } from "../types/types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String; 
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
}

const parseString = (str: unknown): string => {
    if (!isString(str)) {
        throw new Error(`Incorrect or missing field: ` + str);
    }
    return str;
}


const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseString(object.gender),
            occupation: parseString(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect date: some fields are missing')
};

export default toNewPatient;