import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types/types';
import patientService from '../services/patientService';
import toNewPatient from '../utils/utils';
import { z } from 'zod';

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
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        } else {
            res.status(400).send({ eror: 'unknown error' })
        }
    }
});

export default router