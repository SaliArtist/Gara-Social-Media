const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Loading models
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');

// @route GET api/posts/test

// @desc tests user route

// @access posts

router.get('/test', (req, res) => res.json({ msg: 'Posts Work' }));

// @route POST api/posts

// @desc Create Post

// @access private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      fname: req.body.fname,
      lname: req.body.lname,
      uname: req.body.uname,
      date: req.body.date,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    new Post(newPost).save().then((post) => {
      res.json(post);
    });
  }
);

//  @route GET api/posts

// @desc get Posts

// @access public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.json({ post: 'No post' }));
});

//  @route GET api/posts/me

// @desc get my Posts

// @access private
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Post.find({ user: req.user.id })
      .sort({ date: -1 })
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) =>
        res.json({ post: 'You Still Haven Not Posted Anything Yet' })
      );
  }
);

//  @route GET api/posts/following

// @desc get Posts of people I follow

// @access private
router.get('/following', (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.find({ _id: { $in: profile.following } })
        .sort({ date: -1 })
        .then((posts) => {
          res.json(posts);
        })
        .catch((err) => res.json({ post: 'No post' }));
    })
    .catch((err) => res.json(err));
});

//  @route GET api/posts/:id

// @desc get Post by id

// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404));
});

// @route DELETE api/posts

// @desc Delete Post

// @access private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ unauthorized: 'Unauthorized' });
            }
            post.remove().then(res.json({ success: true }));
          })
          .catch((err) => res.json({ post: 'Post not found' }));
      })
      .catch((err) => res.json({ profile: 'Profile not found' }));
  }
);

// @route POST api/posts/like/:id

// @desc like/unlike Post

// @access private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id) !== -1
        ) {
          const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post.save().then((post) => res.json(post));
        } else {
          const newLike = {
            user: req.user.id,
          };
          post.likes.unshift(newLike);
          post.save().then((post) => res.json(post));
        }
      })
      .catch((err) => res.status(404).json({ post: 'No post found' }));
  }
);

// @route GET api/posts/like/:id

// @desc View likes on a Post

// @access public
router.get('/like/:id', (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then((posts) => {
      res.json(posts.likes);
    })
    .catch((err) => res.status(404).json({ post: 'No post found' }));
});

// @route POST api/posts/comment/:id

// @desc Add comment to Post

// @access private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          comText: req.body.comText,
          fname: req.body.fname,
          lname: req.body.lname,
          uname: req.body.uname,
          avatar: req.body.avatar,
          date: req.body.date,
          user: req.user.id,
        };
        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ post: 'No post found' }));
  }
);

// @route GET api/posts/comment/:id

// @desc View comments on a Post

// @access private
router.get('/comments/:id', (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then((posts) => {
      res.json(posts.comments);
    })
    .catch((err) => res.status(404).json({ post: 'No post found' }));
});

// @route DELETE api/posts/comment/:postid/:commentid

// @desc Delete comment

// @access private
router.delete(
  '/comment/:postid/:commentid',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.postid)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.commentid
          ).length === 0
        ) {
          return res.status(404).json({ comment: 'Comment does not exist' });
        }
        const removeIndex = post.comments
          .map((comment) => comment._id.toString())
          .indexOf(req.params.commentid);

        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.json({ post: 'Post not found' }));
  }
);
// @route GET api/posts/comment/:postid/:commentid

// @desc view particular comment

// @access public
router.get('/comment/:postid/:commentid', (req, res) => {
  Post.findById(req.params.postid).then((post) => {
    if (
      post.comments.filter(
        (comment) => comment._id.toString() === req.params.commentid
      ).length === 0
    ) {
      return res.status(404).json({ comment: 'Comment does not exist' });
    }
    const commentIndex = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.commentid);
    res.json(post.comments[commentIndex]);
  });
});
module.exports = router;
