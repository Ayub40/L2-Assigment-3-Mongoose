import express, { Request, Response, Router } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrowBook.model";

export const borrowRoutes: Router = express.Router();

// borrowRoutes.post("/", async (req: Request, res: Response) => {

borrowRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
    const { book, quantity, dueDate } = req.body;

    try {
        const existingBook = await Book.findById(book);
        if (!existingBook) {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
            return;
        }

        if (existingBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${existingBook.copies} copies are available`,
            });
            return;
        }

        existingBook.copies -= quantity;
        await existingBook.save();

        await Book.updateAvailability(existingBook._id);

        const borrowBook = await Borrow.create({ book, quantity, dueDate });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
});

borrowRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error: error.message,
        });
    }
});