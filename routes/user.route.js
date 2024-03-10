import {Router} from "express"
import { deleteUser, disLikeVideo, getAUser, getAllUsers, likeVideo, subscribeUser, unSubscribeUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// update user
router.put("/:id", verifyToken, updateUser)

// delete user
router.delete("/:id", verifyToken, deleteUser)

// get all users
router.get("/", getAllUsers)

// get a user
router.get("/:id", getAUser)

// subscribe a user
router.put("/subscribe/:id", verifyToken, subscribeUser)

// unsubscribe a user
router.put("/unsubscribe/:id", verifyToken, unSubscribeUser)

// like a video
router.put("/like/:videoId", verifyToken, likeVideo)

// dislike a video
router.put("/dislike/:videoId", verifyToken, disLikeVideo)

export default router