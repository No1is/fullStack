import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types/types';
import patientService from '../services/patientService';
import toNewPatient from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSsnPatients())
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body)
        const patient = patientService.addNewPatient(newPatient)
        res.send(patient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message
        }
        res.status(400).send(errorMessage)
    }
});

export default router