import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        if(!userToModify || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing) {
           await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            res.status(200).json({ message: "User followed successfully" });
        }    
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}


const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const userFollowedByMe = await User.findById(userId).select("following");
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                },
            },
            { $sample: { size: 5 } },
        ])
        const filteredUsers = users.filter(user => !userFollowedByMe.following.includes(user._id)); 
        const suggestedUsers = filteredUsers.map(user => ({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profileImg: user.profileImg
            
        }))
        res.status(200).json(suggestedUsers);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const updateUser = async (req, res) => {
        const { username, fullName, email, currentPassword, newPassword, bio, link } = req.body;
        let { profileImg, coverImg } = req.body;
       try { 
           const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
           }
           if (newPassword && currentPassword) {
            const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Incorrect password" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
           } else {
            return res.status(400).json({ message: "Current password is required" });
           }

           if (profileImg) {
               if (user.profileImg) {
                   await cloudinary.uploader.destroy(user.profileImg .split("/").pop().split(".")[0]);
               }

               const uploadedResponse = await cloudinary.uploader.upload(profileImg)
               profileImg = uploadedResponse.secure_url;

           }
           if (coverImg) {
               if (user.coverImg) {
                   await cloudinary.uploader.destroy(user.coverImg .split("/").pop().split(".")[0]);
               }
               const uploadedResponse = await cloudinary.uploader.upload(coverImg)
               coverImg = uploadedResponse.secure_url;
            
           }

           user.username = username || user.username;
           user.fullName = fullName || user.fullName;
           user.email = email || user.email;
           user.bio = bio || user.bio;
           user.link = link || user.link;
           user.profileImg = profileImg || user.profileImg;
           user.coverImg = coverImg || user.coverImg;
           await user.save();
           user.password = null ;
           return res.status(200).json({ message: "User updated successfully", user });
         
         } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUser }; 
