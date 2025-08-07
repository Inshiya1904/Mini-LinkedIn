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
