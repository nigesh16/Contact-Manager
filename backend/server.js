import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnect from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js"

const app = express();

dotenv.config();
dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api",contactRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server running on PORT :"+PORT)
})