import {Router} from "express"
import { addComment, deleteComment, getComments } from "../controllers/comment.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// add comment
router.post('/', verifyToken, addComment)

// delete comment
router.delete('/:id', verifyToken, deleteComment)

// get comment
router.get('/:videoId', verifyToken, getComments)

export default router