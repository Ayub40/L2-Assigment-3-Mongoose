"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const mongoose_1 = require("mongoose");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // client theke available asle remove kora hobe 
        if ('available' in body) {
            delete body.available;
        }
        const data = yield book_model_1.Book.create(body);
        // new change
        yield book_model_1.Book.updateAvailability(data._id);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
}));
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = await Book.find().populate('book')
        // const data = await Book.find()
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort || "dsc";
        // Pagination (page line er last er 1 thik thkbe)
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        // Pagination
        const skip = (page - 1) * limit;
        const condition = filter ? { genre: filter } : {};
        // Pagination
        const total = yield book_model_1.Book.countDocuments(condition);
        const books = yield book_model_1.Book.find(condition)
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
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBook = req.body;
        // client theke available asle remove kora hobe 
        if ('available' in updatedBook) {
            delete updatedBook.available;
        }
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBook, { new: true, });
        yield book_model_1.Book.updateAvailability(new mongoose_1.Types.ObjectId(bookId));
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book Deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
