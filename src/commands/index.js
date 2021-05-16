const BanCommand = require('./ban')
const StartCommand = require('./start')
const UnbanCommand = require('./unban')

/**
 * @typedef {String} CommandName
 *
 * @type {Object.<CommandName, import('./Command')>}
 */
const commandsRoutes = {
  start: new StartCommand(),
  ban: new BanCommand(),
  unban: new UnbanCommand(),
}

module.exports = commandsRoutes
