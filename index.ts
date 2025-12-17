import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import ConnectDB from './config';
import contentRouter from './routes/content';
import authMiddleware from './middlewares/authMiddleware';
import brainRouter from './routes/brain';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.json({
        message :"server is healthy"
    })
})

app.use('/api/v1/user',  userRouter)
app.use('/api/v1/content', authMiddleware , contentRouter)
app.use('/api/v1/brain', authMiddleware , brainRouter)


ConnectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on Port`,PORT );
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });


export default app;
