import { Router } from "express"
import {registerUser} from '../../controllers/auth/auth-controller.js'



const router = Router()

router.post('/register', registerUser) //Call the register user controller

export default router