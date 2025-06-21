import express, { Application, Request, Response } from 'express';
// import { model, Schema } from 'mongoose';
import { bookRoutes } from './app/controllers/book.controller';
// import { notesRoutes } from './app/controllers/notes.controllers';

const app: Application = express();

app.use(express.json())


app.use('/api/books', bookRoutes);
// app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management System');
});

// app.use((req, res) => {
//     res.status(404).json({ message: "Route not found" });
// });


export default app;
