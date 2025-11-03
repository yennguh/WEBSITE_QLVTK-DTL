import Joi from "joi"
const User_COLLECTION_NAME = 'users'
import { ObjectId } from "mongodb"
import { GET_DB } from "../config/mongodb.js"
const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
    phone: Joi.string().required(),
    fullname: Joi.string().required(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updateAt: Joi.date().timestamp('javascript').default(null)
})
const validateCreated = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data);
}
const CreatedUser = async (payload) => {
    try {
        const user = await GET_DB().collection(User_COLLECTION_NAME).findOne({ email: payload.email })
        if (user) {
            throw new Error("Email da ton tai")
        }
        const validadata = await validateCreated(payload)
        const result = await GET_DB().collection(User_COLLECTION_NAME).insertOne(validadata)
        return result;
    }
    catch (error) {
        throw error
    }
}
const FindUserById = async (id) => {
    try {
        const result = await GET_DB().collection(User_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
        return result;
    }
    catch (error) {
        throw error
    }
}
const Login = async (payload) => {
    try {
        const result = await GET_DB().collection(User_COLLECTION_NAME).findOne({
            email: payload.email,
            password: payload.password
        })
        return result;
    }
    catch (error) {
        throw error
    }
}


export const USERMODEL = {
    CreatedUser,
    FindUserById,
    Login
}
