import {Router} from "express"
import { authRoute } from "../controllers/auth.controller.js";

const router = Router();

router.get('/', authRoute)

export default router