import express from "express"
import { createContact, viewContact,
 deleteContact, updateContact } from "../controllers/contactController.js";

const router = express.Router();
 
router.post("/create", createContact);
router.get("/view", viewContact);
router.delete("/delete/:id", deleteContact);
router.put("/update/:id", updateContact);

export default router
