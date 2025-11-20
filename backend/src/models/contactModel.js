import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "../config/mongodb.js";

const CONTACT_COLLECTION_NAME = 'contacts';

const normalizeUserId = (userId) => {
    if (!userId) return undefined;
    if (typeof userId === 'string') return userId.trim() || undefined;
    if (userId instanceof ObjectId) return userId.toString();

    if (typeof userId === 'object') {
        if (userId.$oid && typeof userId.$oid === 'string') {
            return userId.$oid;
        }
        if (typeof userId.toHexString === 'function') {
            return userId.toHexString();
        }
        if (typeof userId.valueOf === 'function') {
            const value = userId.valueOf();
            if (value instanceof ObjectId) return value.toString();
            if (typeof value === 'string') return value;
        }
        const asString = userId.toString();
        if (asString && asString !== '[object Object]') return asString;
    }

    return undefined;
};

const CONTACT_COLLECTION_SCHEMA = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    status: Joi.string().valid('new', 'read', 'replied').default('new'),
    userId: Joi.string().optional(), // Optional: nếu user đã đăng nhập
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null)
});

const validateCreated = async (data) => {
    return await CONTACT_COLLECTION_SCHEMA.validateAsync(data);
};

const createContact = async (payload) => {
    try {
        const normalizedPayload = {
            ...payload,
            userId: normalizeUserId(payload?.userId)
        };

        const validatedData = await validateCreated(normalizedPayload);
        const result = await GET_DB().collection(CONTACT_COLLECTION_NAME).insertOne(validatedData);
        return result;
    } catch (error) {
        throw error;
    }
};

const findContacts = async ({ page = 1, limit = 10, sortBy = 'createdAt', sortOrder = -1, status }) => {
    try {
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        const filter = {};
        if (status) filter.status = status;

        const totalCount = await GET_DB().collection(CONTACT_COLLECTION_NAME).countDocuments(filter);

        const contacts = await GET_DB()
            .collection(CONTACT_COLLECTION_NAME)
            .find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limitNum)
            .toArray();

        return {
            data: contacts,
            pagination: {
                total: totalCount,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalCount / limitNum)
            }
        };
    } catch (error) {
        throw error;
    }
};

const findContactById = async (id) => {
    try {
        const result = await GET_DB()
            .collection(CONTACT_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw error;
    }
};

const updateContact = async (id, payload) => {
    try {
        const updateData = {
            ...payload,
            updatedAt: Date.now()
        };
        const result = await GET_DB()
            .collection(CONTACT_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: 'after' }
            );
        return result;
    } catch (error) {
        throw error;
    }
};

export const CONTACTMODEL = {
    createContact,
    findContacts,
    findContactById,
    updateContact
};

