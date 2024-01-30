import {createError} from "./../error.js"
import User from "./../models/User.model.js"
import Video from "./../models/Video.model.js"

// add video
export const addVideo  = async (req, res, next) => {
  const newVideo = new Video ({userId: req.user.id, ...req.body})
  try {
    const savedVideo = await newVideo.save();

    res.status(200).json(savedVideo);
  } catch (error) {
    next(error)
  }
}

// delete video
export const deleteVideo  = async (req, res, next) => {

  try {
    const video = await Video.findById(req.params.id);
    if(!video) return next(404, "Video does not exist!");

    if(video.userId === req.user.id) {
      const deleteVideo = await Video.findByIdAndDelete(req.params.id)

      res.status(200).json("Video is deleted!")
    } else {
      next(createError(403, "You are not authorized to delete this video!"))
    }
  } catch (error) {
    next(error)
  }
}

// update video
export const updateVideo  = async (req, res, next) => {
  const userId = req.user.id;
  const {id} = req.params;
  try {
    const video = await Video.findById(id);
    console.log(video)
    if(!video) return next(404, "Video does not exist!");

    if(video.userId === userId) {
      const updatedVideo = await Video.findByIdAndUpdate(id, {
        $set: req.body
      }, {new: true})

      res.status(200).json(updatedVideo)
    } else {
      next(createError(403, "You are not authorized to update!"))
    }
  } catch (error) {
    next(error)
  }
}

// update video view
export const updateVideoView  = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(id, {
      $inc: {views: 1}
    });

    res.status(200).json("The view has been increased!");
  } catch (error) {
    next(error)
  }
}

// get all videos
export const getallVideo  = async (req, res, next) => {
  try {
    const allVideos = await Video.find().sort({
      createdAt: -1 // 1 for less viewed
    });

    res.status(200).json(allVideos);
  } catch (error) {
    next(error)
  }
}

// get a video
export const getAVideo  = async (req, res, next) => {
  const {id} = req.params;
  try {
    const video = await Video.findById(id);
    if(!video) return next(404, "Video does not exist!");

    const getVideo = await Video.findById(id)
    res.status(200).json(getVideo)
  } catch (error) {
    next(error)
  }
}

// get trending videos
export const getTrendingVideos  = async (req, res, next) => {
  try {
    const trendingVideos = await Video.find().sort({
      views: -1 // 1 for less viewed
    });

    res.status(200).json(trendingVideos);
  } catch (error) {
    next(error)
  }
}

// get random videos
export const getRandomVideos  = async (req, res, next) => {
  try {
    const randomVideos = await Video.aggregate([{
      $sample: {
        size: 40
      }
    }])

    res.status(200).json(randomVideos);
  } catch (error) {
    next(error)
  }
}

// get subscribed videos
export const getSubscribedVideos  = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map(channelId => {
        return Video.find({
          userId: channelId
        })
      })
    )
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error)
  }
}

// get videos by tag
export const getByTag  = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({
      tags: {
        $in: tags
      }
    }).limit(20);

    res.status(200).json(videos);
  } catch (error) {
    next(error)
  }
}

// search video
export const searchVideo  = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: {
        $regex: query, $options: "i"
      }
    }).limit(20);

    res.status(200).json(videos);
  } catch (error) {
    next(error)
  }
}