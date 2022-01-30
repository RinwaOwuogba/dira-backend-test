import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

app.use('*', notFoundHandler);

app.use(errorHandler);

export default app;
