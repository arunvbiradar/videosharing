import {Router} from "express"
import { deleteUser, dislikeVideo, getAUser, likeVideo, subscribeUser, unSubscribeUser, updateUser } from "../controllers/user.controller";

const router = Router();

// update user
router.put("/:id", updateUser)

// delete user
router.put("/:id", deleteUser)

// get a user
router.put("/:id", getAUser)

// subscribe a user
router.put("/:id", subscribeUser)

// unsubscribe a user
router.put("/:id", unSubscribeUser)

// like a video
router.put("/:id", likeVideo)

// dislike a video
router.put("/:id", dislikeVideo)

export default router