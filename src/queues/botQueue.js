const Bull = require('bull')

const messageJobProcessor = require('./proccessors/messageProcessor')

const { BOT_NAME, BULL_OPTIONS } = require('../../config.json')

const botQueue = new Bull(BOT_NAME, BULL_OPTIONS)

botQueue.process('message', messageJobProcessor)

module.exports = botQueue
