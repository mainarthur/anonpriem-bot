const bot = require('../bots/bot')
const { ParseMode, ChatAction } = require('../constants')
const t18g = require('../locales')
const User = require('../model/user')

const Command = require('./Command')

class UnbanCommand extends Command {
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
    const userId = parseInt(argument)

    if (Number.isNaN(userId)) {
      return bot.sendMessage(chatId, t18g(locale)`user_not_found`)
    }

    const user = await User.findOne({ uid: userId })

    if (!user) {
      return bot.sendMessage(chatId, t18g(locale)`user_not_found`)
    }

    user.isBanned = false

    await user.save()

    return bot.sendMessage(chatId, t18g(locale)`unbanned`, {
      parse_mode: ParseMode.HTML,
      disable_web_page_preview: true,
    })
  }
}

module.exports = UnbanCommand
