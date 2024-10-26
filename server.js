import express from 'express';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.json({
        message:"root hit successfully"
    })
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
