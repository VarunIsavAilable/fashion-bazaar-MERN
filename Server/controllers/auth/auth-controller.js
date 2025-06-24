import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import bcrypt from 'bcryptjs'




// register
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (e) {
        console.error("Error during registration:", e);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};




// login
const login = async(req, res)=>{
    try {
        
    } catch (e) {
        console.log("Error during registration", e)
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
    }
}



// logout



// auth middleware







export { registerUser };
