import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

let server: Server;

const PORT = 4000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uxvdig6.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

main()


