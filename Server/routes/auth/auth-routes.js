import { Router } from "express"
import {registerUser} from '../../controllers/auth/auth-controller.js'
import { loginUser } from "../../controllers/auth/auth-controller.js"
import { logout } from "../../controllers/auth/auth-controller.js"
import { authMiddleware } from "../../controllers/auth/auth-controller.js"

const router = Router()

router.post('/register', registerUser) //Call the register user controller
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/check-auth', authMiddleware, (req, res)=>{
    const user = req.user
    res.status(200).json({
        success: true, message: "Authenticated user!", user
    })
})
export default router