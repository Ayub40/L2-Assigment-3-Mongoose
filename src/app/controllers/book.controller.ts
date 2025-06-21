import express, { Request, Response } from "express"
import { Book } from "../models/book.model"

export const bookRoutes = express.Router()

bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        // console.log(body);
        const data = await Book.create(body);
        // console.log(data);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Validation failed",
            success: false,
            error
        });
    }
});

bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        // const data = await Book.find().populate('book')
        const data = await Book.find()

        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const data = await Book.findById(bookId)

        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
})

bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
        const updatedBook = req.body;
        const data = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true, })

        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
})

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const data = await Book.findByIdAndDelete(bookId);

        res.status(201).json({
            success: true,
            message: "Book Deleted successfully",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
})


