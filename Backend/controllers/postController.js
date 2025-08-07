const postModel  = require('../models/postModel');
const userModel  = require('../models/userModel');
const cloudinary = require('../config/cloudinary');

exports.createPost = async (req, res) => {
 try {
    const { content } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const post = new postModel({
      author: req.user.userId,
      content,
      image: imageUrl,
    });
    console.log("author", req.user.userId)

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find()
      .populate('author', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching posts', error: err.message });
  }
};

exports.getUserProfileWithPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId).select('-password');
    const posts = await postModel.find({ author: userId }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile', error: err.message });
  }
};

// controllers/postController.js
// exports.deletePosts = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     const post = await postModel.findById(postId);
//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     // Check if logged-in user is the creator of the post
//     if (post.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: 'Unauthorized: You can only delete your own posts' });
//     }
//  await post.deleteOne();
//     // const deletePost = await postModel.findByIdAndDelete(postId); // OR postModel.findByIdAndDelete(postId) if already verified
//     res.json({ msg: 'Post deleted successfully' });

//   } catch (err) {
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// };

