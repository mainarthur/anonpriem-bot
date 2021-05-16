const bot = require('../bots/bot')
const { ParseMode, ChatAction } = require('../constants')
const t18g = require('../locales')
const Post = require('../model/post')
const User = require('../model/user')

const Command = require('./Command')

class BanCommand extends Command {
  constructor() {
    super()
  }

  /**
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    return ChatAction.typing
  }

  get admin() {
    return true
  }

  /**
   * @param {import('./Command').Payload} payload
   */
  async method({ chatId, locale, argument }) {
    const postId = parseInt(argument)

    if (Number.isNaN(postId)) {
      return bot.sendMessage(chatId, t18g(locale)`post_not_found`)
    }

    const post = await Post.findOne({ messageId: postId })

    if (!post) {
      return bot.sendMessage(chatId, t18g(locale)`post_not_found`)
    }

    const user = await User.findOne({ uid: post.uid })

    if (!user) {
      return bot.sendMessage(chatId, t18g(locale)`user_not_found`)
    }
    user.isBanned = true
    await user.save()

    return bot.sendMessage(chatId, t18g(locale)`banned`, {
      parse_mode: ParseMode.HTML,
      disable_web_page_preview: true,
    })
  }
}

module.exports = BanCommand
