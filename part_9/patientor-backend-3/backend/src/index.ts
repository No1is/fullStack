import express from 'express';
import diagnoseRouter from './routes/diagnosesRoutes'
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log('now i pong');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});