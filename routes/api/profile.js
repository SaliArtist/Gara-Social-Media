const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Profile = require('../../models/Profile');

// Load User model
const User = require('../../models/User');

//  Loading Validator
const validateProfileInput = require('../../validation/profile');
// @route GET api/profile/test

// @desc tests profile route

// @access public

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route GET api/profile

// @desc Get current profile

// @access private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['fname', 'lname', 'email', 'avatar'])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = 'Profile not found';
          res.status(500).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(errors));
  }
);

// @route POST api/profile

// @desc create/Update profile route

// @access private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.uname) profileFields.uname = req.body.uname;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.location) profileFields.location = req.body.location;
    if (typeof req.body.hobbies !== 'undefined') {
      profileFields.hobbies = req.body.hobbies.split(',');
    }
    if (req.body.website) profileFields.website = req.body.website;
    profileFields.socials = {};
    if (req.body.twitter) {
      profileFields.socials.twitter = req.body.twitter;
    }
    if (req.body.instagram) {
      profileFields.socials.instagram = req.body.instagram;
    }
    if (req.body.facebook) {
      profileFields.socials.facebook = req.body.facebook;
    }
    if (req.body.youtube) {
      profileFields.socials.youtube = req.body.youtube;
    }
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          //   Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then((profile) => res.json(profile))
            .catch((err) => res.status(500).json(errors));
        } else {
          //   Create
          profileFields.followers = [];
          profileFields.following = [];
          Profile.findOne({ uname: profileFields.uname })
            .then((profile) => {
              if (profile) {
                errors.uname = 'Username already taken';
                res.status(404).json(errors);
              } else {
                new Profile(profileFields).save().then((profile) => {
                  res.json(profile);
                });
              }
            })
            .catch((err) => res.status(500).json(errors));
        }
      })
      .catch((err) => res.status(502).json(errors));
  }
);

// @route GET api/profile/:handle

// @desc Get certain profile

// @access public
router.get('/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ uname: req.params.handle })
    .populate('user', ['fname', 'lname', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Profile Not Found';
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ profile: 'Profile Not Found' }));
});

// @route GET api/profile/all

// @desc Get all profiles

// @access public
router.get('/all', async (req, res) => {
  const errors = {};
  try {
    const profiles = await Profile.find().populate('user', [
      'fname',
      'lname',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id

// @desc Get certain profile

// @access public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['fname', 'lname', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'Profile not found';
        res.status(404).json({ errors });
      }
      res.json(profile);
    })
    .catch((err) => res.json(err));
});

// @route POST api/profile/follow/:id

// @desc follow a profile

// @access private
router.post(
  '/user/follow/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.params.id)
      .then((followed) => {
        if (
          followed.followers
            .map((follower) => follower.user.toString())
            .indexOf(req.user.id) !== -1
        ) {
        }
        const newFollower = {
          fname: req.body.fname,
          lname: req.body.lname,
          uname: req.body.uname,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        followed.followers.unshift(newFollower);
        followed.save().then();
      })
      .catch((err) => res.status(404).json({ profile: 'profile not found' }));
    Profile.findById(req.params.id)
      .then((followedAcc) => {
        User.findById(followedAcc.user).then((flUser) => {
          Profile.findOne({ user: req.user.id })
            .then((following) => {
              const newFollowing = {
                uname: followedAcc.uname,
                _id: followedAcc.user,
                fname: flUser.fname,
                lname: flUser.lname,
                avatar: flUser.avatar,
              };
              following.following.unshift(newFollowing);
              following.save().then((following) => res.json(following));
            })
            .catch((err) => res.status(404).json({ profile: 'not logged in' }));
        });
      })
      .catch((err) => res.status(404).json({ profile: 'Profile logged' }));
  }
);

// @route POST api/profile/update-avatar

// @desc Update profile avatar

// @access private
router.post(
  '/update-avatar',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    mongoose.set('useFindAndModify', false);
    User.updateOne({ _id: req.user.id }, { avatar: req.body.avatar })
      .then((user) => {
        User.findOne({ _id: req.user.id }).then((user) => {
          res.json(user.avatar);
        });
      })
      .catch((err) => res.status(500).json({ errors: err }));
  }
);

// @route DELETE api/profile/

// @desc delete a profile

// @access private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Remove profile
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        profile.remove().then(res.json({ success: true }));
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
    // Remove user
    User.findOne({ _id: req.user.id })
      .then((user) => {
        user.remove().then(res.json({ success: true }));
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send('Server Error');
      });
  }
);
// @route POST api/profile/user/unfollow/:id

// @desc unfollow a profile

// @access private
router.post(
  '/user/unfollow/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findById(req.params.id)
      .then((followed) => {
        if (
          followed.followers
            .map((follower) => follower.user.toString())
            .indexOf(req.user.id) !== -1
        ) {
          const removeIndex = followed.followers
            .map((follower) => follower.user.toString())
            .indexOf(req.user.id);

          followed.followers.splice(removeIndex, 1);
          followed.save().then((followed) => res.json(followed));
        } else {
        }
      })
      .catch((err) => res.status(404).json({ profile: 'profile not found' }));
  }
);
module.exports = router;
