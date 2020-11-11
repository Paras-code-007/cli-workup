#! /usr/bin/env node
/*
* cli-workup
* CLI to manage todos anywhere
* @author Paras Arora <https://twitter.com/paras0025>
*/
const init = require('./utils/init')
const cli= require('./utils/cli')
const debug= require('./utils/debug')
const ask = require('./utils/ask')

//modules
const path= require('path')
const fs= require('fs')
const makedir= require('make-dir')
const to= require('await-to-js').default
const handleError= require('cli-display-error')
const alert=require('clialerting')
const {dim: d, yellowBright: y, green: g}= require('chalk')

//local database setup
const low= require('lowdb')
const dbtodosPath= path.join(process.cwd(), './.todo/todos.json')
const FileSync= require('lowdb/adapters/FileSync')

;(async ()=>{

    init(cli.flags)
    // cli.input. and cli.flags.
    cli.input.includes('help') && cli.showHelp(0)
    debug(cli.flags.debug, cli.flags, cli.input)

    if(!fs.existsSync(dbtodosPath)){
        const trypath= await makedir('.todo')
        console.log(trypath)
        process.chdir(trypath)
        fs.writeFileSync('todos.json',"{}")  
    }

    const adapters= new FileSync(dbtodosPath)  
    const db= low(adapters)

    db.defaults({"todos": []}).write()

    if(cli.input.includes('ls')){
        const todolist= db.get('todos').value()  
        todolist.map(function (todo,i) {
            console.log(`${d(`${++i})`)} ${g(todo.title)}`)
        })
        console.log()
    }

    if(cli.input.includes('add')){
        const task= await ask({message: 'Enter task title: ', hint: 'some task write and press enter'})
        db.get('todos').push({title: task}).write()  
        alert({type: 'success', msg: 'Successfully', name: 'Added'})
    }
    
})()