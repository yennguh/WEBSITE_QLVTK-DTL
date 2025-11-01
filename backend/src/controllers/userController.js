import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../config/jwt.js";
import { userServices } from "../services/userServices.js";
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1800";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-tuanta.com-green-cat-a@";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "240hr";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-tuandev-green-cat-a@";
const CreatedUser = async (req, res, next) => {
    try {

        const repon = await userServices.CreatedUser(req.body)
        res.status(StatusCodes.OK).json(repon)

    } catch (error) {
        next(error)
    }
}
const Login = async (req, res, next) => {
    try {
        const repon = await userServices.Login_User(req.body)

        if (repon) {
            const accessToken = await jwtHelper.generateToken(repon, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generaterefresh(repon, refreshTokenSecret, refreshTokenLife);
            return res.status(StatusCodes.OK).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }
        res.status(StatusCodes.OK).json({ status: 0, error: "Not found user" })

    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND)
    }
}
export const userController = {
    CreatedUser,
    Login
}