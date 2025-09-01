import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types/types';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSsnPatients())
});

export default router