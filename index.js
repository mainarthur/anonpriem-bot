const bot = require('./src/bots/bot')
const logger = require('./src/logger')
const mongoose = require('mongoose')

const updateHandler = require('./src/bots/updateHandler')

const { ALLOWED_UPDATES, MONGO } = require('./config.json')

void (async () => {
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  for (const updateType of ALLOWED_UPDATES) {
    bot.on(updateType, updateHandler(updateType))
  }

  await bot.startPolling({
    polling: {
      params: {
        allowed_updates: ALLOWED_UPDATES,
      },
    },
  })

  logger.log(`Bot is started at ${new Date().toLocaleString()}`)
})()
