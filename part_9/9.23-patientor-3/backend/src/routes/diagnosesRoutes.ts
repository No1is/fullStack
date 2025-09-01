import express from 'express';
import { Diagnose } from '../types/types'
import diagnoseService from '../services/diagnoseService';
import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
    res.send(diagnoseService.getDiagnoses())
});

export default router