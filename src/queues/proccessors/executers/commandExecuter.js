const bot = require('../../../bots/bot')

const Timedelta = require('../../../types/Timedelta')

const commandsRoutes = require('../../../commands')
const logger = require('../../../logger')

const { ADMIN_IDS } = require('../../../../config.json')

/**
 *
 * @param {Object} options
 * @param {import('../../../types/UserCommand')} options.command
 * @param {import('node-telegram-bot-api').Message} options.message
 *
 */
const commandExecuter = async ({ command, message }) => {
  const { commandName, argument } = command
  const { date } = message
  const { id: chatId } = message.chat
  const { id: userId, language_code: locale } = message.from ?? {}

  if (!commandsRoutes[commandName]) return

  /**
   * @type {import('../../../commands/Command')}
   */
  const commandHandler = commandsRoutes[commandName]

  if (commandHandler.admin && ADMIN_IDS.includes(userId)) return

  if (commandHandler.action) {
    await bot.sendChatAction(chatId, commandHandler.action)
  }

  /**
   * @type {import('node-telegram-bot-api').Message}
   */
  const responseMessage = await commandHandler.method({
    chatId,
    argument,
    message,
    locale,
  })

  logger.log(
    `[${new Date().toLocaleString()}]${
      userId
        ? `[#id${userId}]${userId !== chatId ? `[#cid${chatId}]` : ''}`
        : ''
    } ${command} ${
      responseMessage ? new Timedelta(date, responseMessage.date) : ''
    }`,
  )
}

module.exports = commandExecuter
