"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrowBook_controller_1 = require("./app/controllers/borrowBook.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.bookRoutes);
app.use('/api/borrow', borrowBook_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management System');
});
exports.default = app;
