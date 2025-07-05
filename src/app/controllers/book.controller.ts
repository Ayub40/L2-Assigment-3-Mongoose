import express, { Request, Response } from "express"
import { Book } from "../models/book.model"
import { Types } from "mongoose";

export const bookRoutes = express.Router()

bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        // client theke available asle remove kora hobe 
        if ('available' in body) {
            delete body.available;
        }

        const data = await Book.create(body);
        // new change
        await Book.updateAvailability(data._id);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data
        })
    } catch (error: any) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
});

bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        // const data = await Book.find().populate('book')
        // const data = await Book.find()
        const filter = req.query.filter as string;
        const sortBy = (req.query.sortBy as string) || "createdAt";
        const sortOrder = (req.query.sort as string) || "dsc";
        // Pagination (page line er last er 1 thik thkbe)
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        // Pagination
        const skip = (page - 1) * limit;

        const condition = filter ? { genre: filter } : {};

        // Pagination
        const total = await Book.countDocuments(condition);

        const books = await Book.find(condition)
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
            // Pagination
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
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
        const bookId = req.params.bookId;
        const data = await Book.findById(bookId);

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

        // client theke available asle remove kora hobe 
        if ('available' in updatedBook) {
            delete updatedBook.available;
        }

        const data = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true, })

        await Book.updateAvailability(new Types.ObjectId(bookId));

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


