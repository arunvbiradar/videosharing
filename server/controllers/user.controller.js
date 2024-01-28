import { createError } from "../error.js"
import User from "./../models/User.model.js"
import Video from "./../models/Video.model.js"

// update user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  if(id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: req.body
      }, {new: true});

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "You are not authorized to update profile!"))
  }
}

// delete user
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if(id === req.user.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      // TODO: logout user after deleting

      res.status(200).json(deletedUser);
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "You are not authorized to delete profile!"))
  }
}

// get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error) {
    next(error)
  }
}

// get a user
export const getAUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
}

// subscribe a user
export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: {subscribedUsers: req.params.id}
    })

    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: 1}
    });

    res.status(200).json("Subscription successfull!");
  } catch (error) {
    next(error)
  }
}

// unsubscribe a user
export const unSubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {subscribedUsers: req.params.id}
    })

    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: -1}
    });

    res.status(200).json("Unsubscription successfull!");
  } catch (error) {
    next(error)
  }
}

// like a video
export const likeVideo = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {likes: userId},
      $pull: {dislikes: userId}
    })

    res.status(200).json("You liked a video");
  } catch (error) {
    next(error)
  }
}

// dislike a video
export const disLikeVideo = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {dislikes: userId},
      $pull: {likes: userId}
    })

    res.status(200).json("You disliked a video");
  } catch (error) {
    next(error)
  }
}