import jwt from "jsonwebtoken";
          
const generateTokenAndSetCookie = (userId, res) => {
                const token = jwt.sign({userId }, process.env.JWT_SECRET, {
                    expiresIn: "15d",
                });
    
                // Since frontend and backend are on same domain (single Render app),
                // we can use SameSite: 'lax' which is more secure and compatible
                const isProduction = process.env.NODE_ENV === "production";
                
                res.cookie("jwt", token, {
                    httpOnly: true,
                    secure: isProduction, // true in production (HTTPS)
                    sameSite: "lax", // 'lax' works for same-domain deployment
                    maxAge: 15 * 24 * 60 * 60 * 1000,
                    path: "/",
                });
             }

        

export default generateTokenAndSetCookie; 
