import express from "express";
import dotenv from "dotenv";
import items from "./routes/food.js"
import orders from "./routes/order.js"
import { connectDB } from "./database.js";
import cors from "cors"

dotenv.config()

const app=express();
const port=process.env.PORT;
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/v1",items);
app.use("/api/v1",orders)

app.listen(port,()=>{
    console.log(`App listening on ${port}`);
})