#! /usr/bin/env node

/*
* cli-workup
* CLI to manage todos anywhere
* @author Paras Arora <https://twitter.com/paras0025>
*/

const init = require('./utils/init')
const cli= require('./utils/cli')
const debug= require('./utils/debug')

//modules
const path= require('path')
const fs= require('fs')
const makedir= require('make-dir')
const to= require('await-to-js').default
const handleError= require('cli-display-error')

const dbtodosPath= path.join(process.cwd(), './todo/todos.json')

;(async ()=>{
    
    init(cli.flags)
    // cli.input. and cli.flags.
    cli.input.includes('help') && cli.showHelp(0)
    debug(cli.flags.debug, cli.flags, cli.input)

    if(!fs.existsSync(dbtodosPath)){
        
        // const [err,trypath]= await to(makedir('.todo'))  
        // handleError('directory could not be made',err)
        //error handling not reqd cause cant find corner case because mkdir -p is used
        const trypath= await makedir('.todo')
        console.log(trypath)
        process.chdir(trypath)
        // process.chdir('.todo') //works too
        fs.writeFileSync('todos.json', "{}")  //write file synchronously
        
    }


})()