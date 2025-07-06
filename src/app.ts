import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrowBook.controller';
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://library-management-system-liart-chi.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json())

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management System');
});

export default app;
