import express from 'express';
import { Response } from 'express';
import { EntryWithoutId, NonSensitivePatient } from '../types/types';
import patientService from '../services/patientService';
import toNewPatient, { EntrySchema } from '../utils/utils';
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

router.get('/:id', (req, res) => {
    try {
        const patient = patientService.getPatientDetails(req.params.id)
        res.send(patient)
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        } else {
            res.status(400).send({ error: 'unknown error '})
        }
    }
})

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService.getPatientDetails(req.params.id)
        const entry = req.body as EntryWithoutId
        const newEntry = patientService.addNewEntry(entry)
        const validEntry = EntrySchema.parse(newEntry)
        patient.entries.push(validEntry) 
        res.send(validEntry)
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues })
        } else {
            res.status(400).send({ error: 'unknown error'})
        }
    }
})

export default router