const BanCommand = require('./ban')
const StartCommand = require('./start')

/**
 * @typedef {String} CommandName
 *
 * @type {Object.<CommandName, import('./Command')>}
 */
const commandsRoutes = {
  start: new StartCommand(),
  ban: new BanCommand(),
}

module.exports = commandsRoutes
