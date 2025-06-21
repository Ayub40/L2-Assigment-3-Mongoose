import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrowBook.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;

        const bookData = await Book.findById(book);

        if (!bookData) {
            const error = new Error("Book not found");
            error.name = "NotFoundError";
            throw error;
        }

        if (bookData.copies < quantity) {
            const error = new Error("Not enough copies available");
            error.name = "InsufficientCopiesError";
            throw error;
        }

        bookData.copies -= quantity;
        await bookData.save();
        await Book.updateAvailability(bookData._id);

        const data = await Borrow.create({
            book: bookData._id,
            quantity,
            dueDate,
        });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data,
        });
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
});