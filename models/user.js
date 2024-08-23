const mongoose = require('mongoose')

const {Schema} = mongoose

const UserModelSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        default:'',
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:''
    },
    profilePicture:{
        type:String,
        default:''
    },
    gender:{
        type:String,
        default:''
    },
    dob:{
        type:Date,
        default:''
    },
    accountStatus:{
        type:String,
        default: 'inactive'
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    isMobileVerified:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})

const UserModel = mongoose.model('user',UserModelSchema)
module.exports = UserModel