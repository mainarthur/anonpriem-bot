const bot = require('../../../bots/bot')
const t18g = require('../../../locales')
const Post = require('../../../model/post')
const getCurrentHour = require('../../../util/getCurrentHour')

const { CHANNEL_ID } = require('../../../../config.json')

const messageExecuter = async ({ user, message }) => {
  const { id: userId, language_code: locale } = message.from
  const { message_id: messageId } = message
  const { id: chatId } = message.chat

  const currentHour = getCurrentHour()
  /**
   * @type {Map<String, Number>}
   */
  const posts = user.posts

  const postsCount = posts.get(currentHour) ?? 0

  if (postsCount > 15) {
    return bot.sendMessage(chatId, t18g(locale)`too_many_posts`)
  }

  posts.set(currentHour, postsCount + 1)

  const { message_id: postId } = await bot.copyMessage(
    CHANNEL_ID,
    chatId,
    messageId,
  )

  await Post.create({ uid: userId, messageId: postId })
}

module.exports = messageExecuter
