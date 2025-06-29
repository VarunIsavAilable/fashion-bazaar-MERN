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
const loginUser = async(req, res)=>{

    const {email, password} = req.body;
    try {
        
        const existingUser = await User.findOne({email})

        if(!existingUser){
            console.log("No user found")
            return res.status(400).json({success: false, message: "Email does not exist."})
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if(!passwordMatch){
            console.log("Invalid password")
            return res.status(400).json({success: false, message: "Password is invalid."})
        }

        const token = jwt.sign({
            id: existingUser._id, role: existingUser.role, email: existingUser.email, username: existingUser.username
        }, 'CLIENT_SECRET_KEY', { expiresIn: '20d' })

        // {expiresIn: '10000000m'}

        res.cookie('token', token, {httpOnly : true, secure : false}).json({
            success: true, message: 'Logged in successfully.', user: {
                email: existingUser.email, role: existingUser.role, id: existingUser.id, username: existingUser.username
            }
        })
        
    } catch (e) {
        console.log("Error during registration")
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
    }
}



// logout
const logout = (req, res)=> {
    res.clearCookie('token').json({
        success: true, message: 'Logged out successfully.'
    })
}



// auth middleware
const authMiddleware = async (req, res, next)=> {
    const token = req.cookies.token
    if(!token) return res.status(401).json(
        {
            success: false,
            message: 'Unauthorized user!'
        }
    )

    try{
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY')
        req.user = decoded
        next()
    }catch(error){
        res.status(401).json(
        {
            success: false,
            message: 'Unauthorized user!'
        }
    )
    }
}







export { registerUser, loginUser, logout, authMiddleware };
