import { model, Schema, Types } from "mongoose";
import { IBook, UserStaticMethod } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>({
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
        min: [0, "Copies must be a"]
    },
    available: {
        type: Boolean,
        default: true
    },
},
    {
        versionKey: false,
        timestamps: true
    }
)

bookSchema.static(
    "updateAvailability",
    async function (bookId: Types.ObjectId) {
        const book = await this.findById(bookId);
        if (book) {
            book.available = book.copies > 0;
            await book.save();
        } else {
            console.warn(`Book with ID ${bookId} not found for availability update.`);
        }
    }
);



export const Book = model<IBook, UserStaticMethod>("Book", bookSchema)