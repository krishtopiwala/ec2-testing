import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
// import morgan from './'
import morgan from "morgan";
import fs from "fs";
import path from "path";

const app : express.Application = express();
dotenv.config({ path: "./.env" });


// app.use(morgan("dev"));

app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT : Number = Number(process.env.PORT);
const DBURL : string = String(process.env.MONGO_URL);

connectDB(DBURL);

app.get("/", async (request : Request, response : Response) => {
    try {
        await response.json({ msg: "Hello" });
    } catch (error) {
        console.error(error);
        response.status(404).json({ msg: "Page not found" });
    }
});

app.listen(PORT || 5001, () => {
    console.log("Server is started at PORT:", PORT);
});