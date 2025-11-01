import { USERMODEL } from "../models/usermodel.js";


const CreatedUser = async (payload) => {
    try {
        const result = USERMODEL.CreatedUser(payload);
        return result;

    }
    catch (error) {
        throw error
    }

}

const FindUserbyId = async (id) => {
    try {
        const result = USERMODEL.FindUserById(id);
        return result;

    }
    catch (error) {
        throw error
    }

}

const Login_User = async (payload) => {
    try {
        const result = USERMODEL.Login(payload);
        return result;

    }
    catch (error) {
        throw error
    }

}

export const userServices = {
    CreatedUser,
    FindUserbyId,
    Login_User
}