const Post = require("../models/post");
const Comment = require("../models/comment");
exports.getIndex = (req, res, next) => {   
  Post.find()
    .then(docs => {
      res.render("index", { posts: docs, pageTitle: "Your Blog" });
    })
    .catch(err => console.log(err));
};

exports.getAddPost = (req, res, next) => {
  res.render("add-post", { pageTitle: "Add-Post" });
};
exports.postAddPost = (req, res, next) => {
  const userId = req.user._id;
  const { title, content } = req.body;
  if (!title || !content) {
    req.flash("error_msg", "plz fill out all fields!!");
    res.redirect("/add-post");
  }
  const author = req.user.name;
  const date = Date().substring(4, 16);
  const pic = req.user.profilePic;
  const post = new Post({ title, content, author, date, userId, pic });
  post
    .save()
    .then(post => {
      console.log("successfuly posted..!");
      res.redirect("/dashboard");
    })
    .catch(err => console.log(err));
};
exports.postDeletePost = (req, res, next) => {
  const postId = req.body.postId;

  Post.deleteOne({ _id: postId })
    .then(() => {
      console.log("successfully deleted..!");
      res.redirect("/dashboard");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/dashboard");
    });
  // console.log(postId);
};
exports.postPostComment = (req, res, next) => {
  const { content, postId } = req.body;
  if (!content) res.redirect("/");
  const postedBy = req.user.name;
  const comment = new Comment({ content, postId, postedBy });
  comment
    .save()
    .then(comment => {
      Post.findById(comment.postId).then(post => {
        post.comments.push(comment);
        post.save();
        console.log("commneted successfully");
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
};
