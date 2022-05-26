const express = require('express');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const router = express.Router();
const gravatar = require('gravatar');
const createAvatar = require('@dicebear/avatars');
const avatarStyle = require('@dicebear/open-peeps');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

// Loading validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/user/test

// @desc tests user route

// @access public

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route POST api/user/register

// @desc Register user

// @access public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((emailExist) => {
    if (emailExist) {
      errors.email = 'Email already exists';
      return res.status(400).json({ email: 'Email Is Already In Use' });
    } else {
      const seed = Math.round(Math.random() * 100);
      const avatar = `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`;
      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/user/login

// @desc Login user

// @access private
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const uname = req.body.uname;
  const password = req.body.password;
  //   Check username
  Profile.findOne({ uname })
    .then((user) => {
      if (!user) {
        User.findOne({ email: uname })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ msg: 'User Not Found' });
            }
            bcrypt
              .compare(password, user.password)
              .then((isMatch) => {
                if (isMatch) {
                  //   User matched
                  const payload = {
                    id: user.id,
                    fname: user.fname,
                    lname: user.lname,
                    avatar: user.avatar,
                  }; // jwt payload
                  jwt.sign(
                    payload,
                    key.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: 'Bearer ' + token,
                      });
                    }
                  );
                } else {
                  return res
                    .status(404)
                    .json({ msg: 'Invalid Username or Password' });
                }
              })
              .catch((err) =>
                res.status(400).json({ msg: 'Unknown Error. Try Again Later' })
              );
          })
          .catch((err) =>
            res.status(400).json({ msg: 'Unknown Error. Try Again Later' })
          );
      } else {
        // Check password
        User.findOne({ _id: user.user }).then((user) => {
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                //   User matched
                const payload = {
                  id: user.id,
                  fname: user.fname,
                  lname: user.lname,
                  avatar: user.avatar,
                }; // jwt payload
                jwt.sign(
                  payload,
                  key.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token,
                    });
                  }
                );
              } else {
                return res
                  .status(400)
                  .json({ msg: 'Invalid Username or Password' });
              }
            })
            .catch((err) =>
              res.status(400).json({ msg: 'Invalid Username or Password' })
            );
        });
      }
    })
    .catch((err) =>
      res.status(400).json({ msg: 'Invalid Username or Password' })
    );
});

// @route GET api/user/current

// @desc Current user

// @access private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      uname: req.user.uname,
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
    });
  }
);

module.exports = router;
