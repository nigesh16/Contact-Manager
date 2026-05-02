import Contact from "../models/contact.js";

export const createContact = async(req, res) => {
    try {
        const{name, phone, email} = req.body;

        if(!name || !phone || !email)
            return res.status(400).json({message: "All fields are required"});
        
        const newContact = new Contact({
            name, phone, email,
        })
        await newContact.save();
        res.status(201).json({
            message : "Contact saved successfully",
            data : newContact
        })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}

export const viewContact = async(req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            data : contacts
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}

export const deleteContact = async(req, res) => {
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({
                message : "contact not found"
            })
        }
        res.status(200).json({
            message : "Successfully deleted"
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}

export const updateContact = async(req, res) => {
    try {
        const {id} = req.params;
        const contact = await Contact.findByIdAndUpdate(id,req.body,{ new: true });
        if(!contact){
            return res.status(404).json({
                message : "contact not found"
            })
        }
        res.status(200).json({
            message : "Successfully updated"
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}