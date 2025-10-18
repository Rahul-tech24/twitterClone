import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken.userId).select("-password"); 
            if (user) {
                req.user = user;
                next();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default protectRoute;