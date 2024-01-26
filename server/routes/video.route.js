import {Router} from "express"
import { getAVideo } from "../controllers/video.controller.js";

const router = Router();

router.get('/', getAVideo)

export default router