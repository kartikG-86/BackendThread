const userModel = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require("dotenv").config();
const secretKey = process.env.SECRET_KEY

const generateToken = async (user) => {
    const data = {
        user: {
            userId: user._id,
        }
    }

    const token = jwt.sign(data, secretKey)
    return token
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body

    const findUser = await userModel.findOne({ email: email });

    if (findUser) {
        return res.status(400).json({
            success: false,
            message: "User already exist"
        })
    }

    const hashSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, hashSalt);

    const createUser = await userModel.create({
        email: email,
        name: name,
        password: hashPassword
    })

    const token = await generateToken(createUser)
    const safeUser = { ...createUser }
    delete safeUser._doc.password
    return res.json({
        success: true,
        status: 200,
        token: token,
        user: safeUser,
        message: "User created successfully"
    })
}

module.exports = signUp