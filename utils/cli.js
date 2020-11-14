const meow= require('meow')
const {green, yellow, cyan}= require('chalk')
const chalk = require('chalk')

const helptext= `
Usage
${green('npx cli-workup')} ${cyan('[--options]')} ${yellow('<input>')}

if installed globally using \`npm install -g cli-workup\`
${green('cli-workup')} ${cyan('[--options]')} ${yellow('<input>')}
${green('workup')} ${cyan('[--options]')} ${yellow('<input>')}

Flags/Options + alias                          ${chalk.dim('Defaults')}
${cyan('--debug')},${cyan(' -d')}       : to debug the cli             ${chalk.dim('false')}
${cyan('--minimal')},${cyan(' -m')}     : to show minimal information  ${chalk.dim('false')}
${cyan('--clear')},${cyan(' -c')}       : to clear console before run  ${chalk.dim('false')}
${cyan('--help')}            : for help
${cyan('--version')},${cyan(' -V')}     : for pkg/CLI version

Inputs/Commands
${yellow('add')}               : for adding a todo to the list
${yellow('ls')}                : for listing all the todos in list
${yellow('del')}               : for deleting multiple todos from the list
${yellow('help')}              : for help and info about cli

Examples
use --no-flag or -alias-f to set these flags to false

`

const options= {
    inferType: true, 
    hardRejection: false, 
    flags: {
        debug: {
            type: 'boolean',
            default: false,
            alias: 'd'
        },
        version: {
            alias: 'V',
        },
        minimal: {
            type: 'boolean',
            alias: 'm'
        },
        clear: {
            type: 'boolean',
            default: false,
            alias: 'c'
        }
    }
}

const cli= meow(helptext,options)

module.exports= cli