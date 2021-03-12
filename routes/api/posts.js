const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Post = require("../../models/Posts");
const User = require("../../models/Users");
const router = express.Router();
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [auth, [check("content", "content is required").not().isEmpty()]],
  async (req, res) => {
    console.log("req.body.content", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        content: req.body.content,
        name: user.name,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    GET api/posts/:user_id
// @desc     Get all posts by user
// @access   Private
router.get("/:user_id", auth, async (req, res) => {
  try {
    console.log(req.params.user_id);
    const posts = await Post.find({ user: req.params.user_id }).sort({
      date: -1,
    });
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    GET api/posts/:id
// @desc     Get posts by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectID") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error");
  }
});
// @route    DELETE api/posts/:id
// @desc     delete posts by id
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    //check if the user is the creator of post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "USer not authorised" });
    }
    await post.remove();
    res.json("post removed");
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectID") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     like post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //   check if already liked by user
    if (
      post.likes.filter((like) => like.user.toString() == req.user.id).length >
      0
    ) {
      return res.status(400).json("post already liked");
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
// @route    PUT api/posts/unlike/:id
// @desc     like post
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //   check if already liked by user
    if (
      post.likes.filter((like) => like.user.toString() == req.user.id).length ==
      0
    ) {
      return res.status(400).json("post not liked by you  ");
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    POST api/posts/:post_id/comment
// @desc     Create a comment on a post
// @access   Private
router.post(
  "/:post_id/comment",
  [auth, [check("content", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        content: req.body.content,
        name: user.name,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/:post_id/comment/:comment_id
// @desc     delete a comment on a post
// @access   Private
router.delete("/:post_id/comment/:comment_id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //get comment from post

    const comment = post.comments.find(
      (eachComment) => eachComment.id == req.params.comment_id
    );
    // see if comment is there
    if (!comment) {
      return res.status(404).json({ msg: "comment doesn't exist" });
    }
    // see if deleter and creator of comment are same

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send("user not authorised");
    }

    const removeIndex = post.comments
      .map((eachComment) => eachComment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// TO DO - APIs
// 1) like unlike comment
// 2) edit comment

module.exports = router;
