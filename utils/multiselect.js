const {MultiSelect}= require('enquirer')
const to= require('await-to-js').default
const handleError= require('cli-display-error')
const {magenta}= require('chalk')

module.exports= async ({message,choices })=>{  //destructuring message hint and from the object passed

    const [err,res]= await to(new MultiSelect({
        message,
        hint: 'Press [space] to select and [enter] to submit',
        choices,
        limit: 7,
        validate(value){
            // console.log(value)
            return value.length === 0? "Please select atleast one task" : true
        }
    })
    .on('cancel',()=>{
        console.log(`${magenta.bold('❯ Cancelled')}`)
        process.exit(0)
    })
    .run())

    handleError('Input Error',err)

    return res

}