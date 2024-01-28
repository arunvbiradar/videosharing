import Comment from "./../models/Comments.model.js"
import Video from "./../models/Video.model.js"
import {createError} from "./../error.js"


// add comment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({...req.body, userId: req.user.id})
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (error) {
    next(error);
  }
}

// delete comment
export const deleteComment = async (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;
  try {
    const comment = await Comment.findById(id);
    const video = await Video.findById(comment.videoId)

    if(userId === comment.userId || userId === video.userId) {
      await Comment.findByIdAndDelete(id);
      res.status(200).send("Comment has been deleted!");
    } else {
      return next(createError(403, "You are not authorized to delete the comment!"));
    }
  } catch (error) {
    next(error);
  }
}

// get comment
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId
    });
    res.status(200).json(comments)
  } catch (error) {
    next(error);
  }
}