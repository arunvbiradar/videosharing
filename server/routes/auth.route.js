import {Router} from "express"
import { signin, signup } from "../controllers/auth.controller.js";

const router = Router();

// create user
router.post('/signup', signup)

// sign in user
router.post('/signin', signin)

// google authentication
router.post('/google',)

export default router