import {Router} from "express"
import { addVideo, deleteVideo, getAVideo, getByTag, getRandomVideos, getSubscribedVideos, getTrendingVideos, getallVideo, searchVideo, updateVideo, updateVideoView } from "../controllers/video.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// add video
router.post("/", verifyToken, addVideo)

// delete video
router.delete("/:id", verifyToken, deleteVideo)

// update video
router.put("/:id", verifyToken, updateVideo)

// update video view
router.put("/view/:id", verifyToken, updateVideoView)

// get all videos
router.get("/", getallVideo)

// get a video
router.get("/find/:id", getAVideo)

// get trending videos
router.get("/trending", getTrendingVideos)

// get random videos
router.get("/random", getRandomVideos)

// get random videos
router.get("/subscribed", verifyToken, getSubscribedVideos)

// get videos by tags
router.get("/tags", getByTag)

// search videos
router.get("/search", searchVideo
)

export default router