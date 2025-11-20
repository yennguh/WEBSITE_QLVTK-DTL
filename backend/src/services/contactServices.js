import { CONTACTMODEL } from "../models/contactModel.js";

const createContact = async (payload) => {
    try {
        const result = await CONTACTMODEL.createContact(payload);
        return result;
    } catch (error) {
        throw error;
    }
};

const getContacts = async (params) => {
    try {
        const result = await CONTACTMODEL.findContacts(params);
        return result;
    } catch (error) {
        throw error;
    }
};

const getContactById = async (id) => {
    try {
        const result = await CONTACTMODEL.findContactById(id);
        return result;
    } catch (error) {
        throw error;
    }
};

const updateContact = async (id, payload) => {
    try {
        const result = await CONTACTMODEL.updateContact(id, payload);
        return result;
    } catch (error) {
        throw error;
    }
};

export const contactServices = {
    createContact,
    getContacts,
    getContactById,
    updateContact
};

