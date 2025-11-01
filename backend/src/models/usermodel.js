import Joi from "joi"
const User_COLLECTION_NAME = 'users'
import { ObjectId } from "mongodb"
import { GET_DB } from "../config/mongodb.js"
const USER_COLLECTION_SCHEMA = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
        .min(4),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updateAt: Joi.date().timestamp('javascript').default(null)
})
const validateCreated = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data);
}
const CreatedUser = async (payload) => {
    try {

        console.log("payload", payload);
        const validadata = await validateCreated(payload)
        console.log("validadata", validadata);
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
            username: payload.username,
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
