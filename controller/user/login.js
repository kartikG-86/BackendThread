const userModel = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const generateToken = async (user) => {
    const data = {
        user: {
            userId: user._id,
        }
    }

    const token = jwt.sign(data, secretKey)
    return token
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email: email })

    // check existance of user
    if (!findUser) {
        return res.status(400).json({
            success: false,
            message: "User doesn't exist."
        })
    }

    // check password
    const passwordCheck = await bcrypt.compare(password, findUser.password);
    if (!passwordCheck) {
        return res.status(400).json({
            success: false,
            message: "Password doesn't match. Please enter right credentials"
        })
    }

    const token = await generateToken(findUser)
    const safeUser = { ...findUser }
    delete safeUser._doc.password
    return res.json({
        success: true,
        status: 200,
        token: token,
        user: safeUser._doc,
        message: "User logged in successfully"
    })
}

module.exports = login