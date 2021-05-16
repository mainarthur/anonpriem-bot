const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  uid: {
    type: Number,
    required: true,
    index: true,
  },
  messageId: {
    type: Number,
    required: true,
    index: true,
  },
})

/**
 * @typedef {import('mongoose').Document} PostDocument
 * @property {Number} uid
 * @property {Number} messageId
 *
 */

/**
 * @type {import('mongoose').Model<PostDocument>}
 */
const Post = model('post', PostSchema)

module.exports = Post
