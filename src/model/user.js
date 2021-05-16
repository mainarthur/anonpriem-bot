const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  uid: {
    type: Number,
    required: true,
    index: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  posts: {
    required: true,
    type: Map,
    of: Number,
  },
})

/**
 * @typedef {import('mongoose').Document} UserDocument
 * @property {Number} uid
 * @property {Boolean} isBanned
 * @property {Map<String, Number>} posts
 *
 */

/**
 * @type {import('mongoose').Model<UserDocument>}
 */
const User = model('user', UserSchema)

module.exports = User
