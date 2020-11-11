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
        
        // const [err,trypath]= await to(makedir('.todo'))  
        // handleError('directory could not be made',err)
        //error handling not reqd cause cant find corner case because mkdir -p is used
        const trypath= await makedir('.todo')
        console.log(trypath)
        process.chdir(trypath)
        // process.chdir('.todo') //works too
        // fs.writeFileSync('todos.json', "{}")  //write file synchronously
        fs.writeFileSync('todos.json',"{}")  //write file synchronously (not a fn to create file, creates file if not exist and then write it, if file already exist then replace it)
        //if second arguement is not specified here then it will write undefined in the file because of which error comes Malformed JSON in file: at the adapater line
    }

    //sure here that .todo exist here because if not exist then it had been made, therfore place this
    const adapters= new FileSync(dbtodosPath)  //checks wether the json file provided as adapter is valid json or not if not then exits
    const db= low(adapters)

    db.defaults({"todos": []}).write()

    if(cli.input.includes('ls')){
        // const todolist= db.get('todos') //returns the todos key in file todos.json
        // db.get('key')  //returns the key in the db defined using filesync adapter which is adapter to a single local file database
        // console.log('Todolist: ', todolist)
        // console.log('Todolist: ', todolist.value())
        
        // const todolist= db.get('todos') //returns the todos key in file todos.json
        const todolist= db.get('todos').value()  //to remove the loadash wrapper and get only the value use .value fn
        // const todolist= db.get('todos').__wrapped__
        // const todolist= db.get('todos').__wrapped__.todos
        // console.log('Todolist: ', todolist)
        todolist.map(function (todo,i) {
            console.log(`${d(`${++i})`)} ${g(todo.title)}`)
        })
        console.log()
    }

    if(cli.input.includes('add')){
        const task= await ask({message: 'Enter task title: ', hint: 'some task write and press enter'})
        // db.get('key')  //returns the key in the db defined using filesync adapter which is adapter to a single local file database
        // db.get('todos').push()  //push property is used to push to something into this array
        // db.get('todos').push({title: 'hello world'}).write()   //to write the todos key into the database db
        db.get('todos').push({title: task}).write()  //.write function to write the todos key/array into db
        alert({type: 'success', msg: 'Successfully', name: 'Added'})
    }

})()