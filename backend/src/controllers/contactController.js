import { StatusCodes } from "http-status-codes";
import { contactServices } from "../services/contactServices.js";

const createContact = async (req, res, next) => {
    try {
        // Optional: check if user is authenticated (middleware isAuth is optional)
        const decoded = req.jwtDecoded || null;
        const payload = {
            ...req.body,
            userId: decoded?._id || null
        };
        const result = await contactServices.createContact(payload);
        res.status(StatusCodes.CREATED).json({
            message: 'Contact message sent successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getContacts = async (req, res, next) => {
    try {
        const decoded = req.jwtDecoded;
        // Only admin can view all contacts
        if (!decoded || !decoded.roles?.includes('admin')) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Only admin can view contacts' });
        }

        const params = req.query;
        const result = await contactServices.getContacts(params);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const decoded = req.jwtDecoded;
        if (!decoded || !decoded.roles?.includes('admin')) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Only admin can update contacts' });
        }

        const { id } = req.params;
        const result = await contactServices.updateContact(id, req.body);
        res.status(StatusCodes.OK).json({
            message: 'Contact updated successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const contactController = {
    createContact,
    getContacts,
    updateContact
};

