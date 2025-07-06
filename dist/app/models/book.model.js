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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        uppercase: true,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: '{VALUE} is not a valid genre'
        },
        default: 'FICTION'
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
});
// bookSchema.static("updateAvailability", async function (bookId: Types.ObjectId) {
//     const book = await this.findById(bookId);
//     if (book) {
//         const available = book.copies > 0;
//         await this.findByIdAndUpdate(bookId, { $set: { available } });
//     }
// });
bookSchema.static("updateAvailability", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedBook = yield this.findByIdAndUpdate(bookId, {
                $set: {
                    available: (yield this.findById(bookId)).copies > 0,
                },
            }, { new: true });
            if (!updatedBook) {
                console.warn(`Book with ID ${bookId} not found for availability update.`);
            }
        }
        catch (error) {
            console.error(`Error updating availability for Book ID ${bookId}:`, error);
        }
    });
});
bookSchema.post("findOneAndUpdate", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.available = doc.copies > 0;
        yield doc.save();
        next();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
