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
        min: [0, "Copies must be a positive number"]
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

bookSchema.static("updateAvailability", async function (bookId: Types.ObjectId) {
    try {
        const updatedBook = await this.findByIdAndUpdate(
            bookId,
            {
                $set: {
                    available: (await this.findById(bookId)).copies > 0,
                },
            },
            { new: true }
        );

        if (!updatedBook) {
            console.warn(`Book with ID ${bookId} not found for availability update.`);
        }
    } catch (error) {
        console.error(`Error updating availability for Book ID ${bookId}:`, error);
    }
});

bookSchema.post("findOneAndUpdate", async function (doc, next) {
    doc.available = doc.copies > 0;
    await doc.save();
    next();
});


export const Book = model<IBook, UserStaticMethod>("Book", bookSchema)