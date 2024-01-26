import {Router} from "express"
import { getAComment } from "../controllers/comment.controller.js";

const router = Router();

router.get('/', getAComment)

export default router