import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSendResponse from "../lib/utils/generateToken.js";

const signup = async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body;

        if (!username || !fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(!email.includes("@")) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            generateTokenAndSendResponse(newUser._id, res);
            await newUser.save();
            res.status(201).json(
                {
                    _id: newUser._id,
                    username: newUser.username,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg,
                    followers: newUser.followers,
                    following: newUser.following
                }
            );
        } else {
            return res.status(400).json({ message: "User not created" });
        }
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "username and password are required" });
        }
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect || !user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (user) {
            generateTokenAndSendResponse(user._id, res);
        }
         res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            followers: user.followers,
            following: user.following
        })
    } catch (error) {
        console.log(error);
    }   
};

const logout = (req, res) => {
   
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
    }

};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
       
    } catch (error) {
        console.log(error);
    }
}

export { signup, login, logout, getUser };
