import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (Number.isNaN(height) || Number.isNaN(weight)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    
    const index = {
        height: height,
        weight: weight,
        bmi: calculateBmi(height, weight)
    };

    return res.json(index);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});