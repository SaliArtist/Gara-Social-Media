const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
    max: 150,
  },
  avatar: {
    type: String,
    require: true,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  uname: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      fname: {
        type: String,
      },
      lname: {
        type: String,
      },
      uname: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: String,
        default: Date.now,
      },
      comText: {
        type: String,
        required: true,
        max: 250,
      },
      comLikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
    },
  ],
  date: {
    type: String,
    default: Date.now,
  },
});
module.exports = mongoose.model('post', PostSchema);
