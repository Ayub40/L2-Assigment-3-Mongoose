import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


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



export const Book = model("Book", bookSchema)