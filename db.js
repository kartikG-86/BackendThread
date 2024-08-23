const mongoose = require('mongoose')

const connectURI = 'mongodb://localhost:27017/threads'
const connectToMongo = () =>{
    mongoose.connect(connectURI).then((res)=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectToMongo