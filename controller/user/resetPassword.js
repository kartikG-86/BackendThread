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

const resetPassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "The new password and confirmed password do not match. Please ensure both passwords are identical and try again.",
        })
    }
    const findUser = await userModel.findOne({ email: email })

    // check existance of user
    if (!findUser) {
        return res.status(400).json({
            success: false,
            message: "User doesn't exist."
        })
    }

    const comparePass = await bcrypt.compare(password, findUser.password);
    if (comparePass) {
        return res.status(400).json({
            success: false,
            message: "Your new password must be different from your previous password. Please choose a new password.",
        });
    }

    // Save new password
    const hashSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, hashSalt);

    await userModel.updateOne({ email: email }, { $set: { password: hashPassword } })
    const token = await generateToken(findUser)
    return res.json({
        success: true,
        status: 200,
        token: token,
        message: "Password updated successfully"
    })
}

module.exports = resetPassword