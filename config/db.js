const mangoose=require('mongoose')
const config=require('config')

const db=config.get('mongoURI')

// const connectDB=()=>{
//     mangoose.connect(db,{
//         useNewUrlParser:true,
//         useCreateIndex:true,
//         useFindAndModify:false
//     })
//     .then(()=>console.log("mangoDB connected"))
//     .catch(err=>
//         {
//     console.error(err.message)
//     process.exit(1)
//        })
// }

const connectDB= async ()=>{
   
    try{
       await mangoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false
        })
        console.log("mangoDB connected")
    }
    catch{
        console.error(err.message)
        process.exit(1)
    }
}



module.exports=connectDB;