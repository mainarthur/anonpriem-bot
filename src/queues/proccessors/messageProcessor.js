const commandParser = require('../../util/commandParser')
const logger = require('../../logger')
const commandExecuter = require('./executers/commandExecuter')
const User = require('../../model/user')
const messageExecuter = require('./executers/messageExecuter')

/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").Message>}  job
 */
const messageJobProcessor = async ({ data: message }) => {
  try {
    const { id: userId } = message.from

    const user = await getUser(userId)

    if (user.isBanned) return

    const command = commandParser(message)

    if (command) {
      await commandExecuter({ command, message })
    }

    if (!command) {
      await messageExecuter({ message, user })
    }

    await user.save()
  } catch (err) {
    logger.err(err)
  }
}

const getUser = async (userId) => {
  const user = await User.findOne({ uid: userId })

  if (user) return user

  return new User({ uid: userId, posts: {} })
}

module.exports = messageJobProcessor
