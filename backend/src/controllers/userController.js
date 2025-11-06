import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../config/jwt.js";
import { userServices } from "../services/userServices.js";
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "240hr";
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

const InfoUser = async (req, res, next) => {
    try {
        // `isAuth` middleware sets `req.jwtDecoded` after verifying the token
        const decoded = req.jwtDecoded;
        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided or invalid.' });
        }

        // token payload uses `_id` when created in jwtHelper.generateToken
        const userId = decoded._id
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User id not found in token.' });
        }
        const user = await userServices.GetUserInfor(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found.' });
        }
        if (user) {
            let data = {
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
            }
            return res.status(StatusCodes.OK).json(data);
        }

    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND)
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
const refreshToken = async (req, res) => {
    // Get refresh token from request
    const { refreshToken: token } = req.body;

    if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Refresh token is required'
        });
    }

    try {
        // Verify refresh token
        const decoded = await jwtHelper.verifyToken(token, refreshTokenSecret);

        // Generate new access token
        const accessToken = await jwtHelper.generateToken(decoded, accessTokenSecret, accessTokenLife);

        return res.status(StatusCodes.OK).json({
            accessToken
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Invalid refresh token'
        });
    }
}

const ListUsers = async (req, res, next) => {
    try {
        const { page, limit, sortBy, sortOrder } = req.query;
        const result = await userServices.ListUsers({
            page,
            limit,
            sortBy,
            sortOrder: sortOrder === 'asc' ? 1 : -1
        });
        
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}

export const userController = {
    CreatedUser,
    Login,
    InfoUser,
    refreshToken,
    ListUsers
}