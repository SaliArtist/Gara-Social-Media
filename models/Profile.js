const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  uname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    max: 40,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      uname: {
        type: String,
      },
      fname: {
        type: String,
      },
      lname: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      uname: {
        type: String,
      },
      fname: {
        type: String,
      },
      lname: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
  ],
  hobbies: {
    type: [String],
  },
  socials: {
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    youtube: {
      type: String,
    },
  },
});
module.exports = mongoose.model('profile', ProfileSchema);
