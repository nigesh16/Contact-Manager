import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
});

export default mongoose.model("Contact", contactSchema);