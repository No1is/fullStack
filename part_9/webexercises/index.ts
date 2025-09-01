import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, exerciseStats } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    const dailyHours = req.body.dailyHours;
    const target = req.body.target;

    if (
        !isNaN(Number(target))
        && Array.isArray(dailyHours) 
        && !dailyHours.some((n: unknown) => 
            Number.isNaN(n) || typeof n !=='number')
    ) {
        const result = calculateExercises(dailyHours, target) as exerciseStats;
        return res.send({ result });
    };

    return res.status(400).json({ error: 'malformatted paramateres' });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});