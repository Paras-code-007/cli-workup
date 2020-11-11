const {Input}= require('enquirer')
const to= require('await-to-js').default
const handleError= require('cli-display-error')
const {magenta}= require('chalk')

module.exports= async ({message,hint })=>{  //destructuring message hint and from the object passed

    const [err,res]= await to(new Input({
        message,
        hint,
        validate(value,state){
            return !value? "Please enter task" : true
        }
    })
    .on('cancel',()=>{
        console.log("Cancelled")
    })
    .run())

    handleError('Input Error',err)

    return res

}