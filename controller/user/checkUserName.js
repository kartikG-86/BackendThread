const userModel = require('../../models/user')

const checkUsername = async (req, res) => {
    const username = req.params.username;
    const findUsername = await userModel.find({ username: username })

    if (findUsername && findUsername.length > 0) {
        return res.status(400).json({
            success: false,
            message: "username not available"
        })
    }

    return res.json({
        success: true,
        message: "username available",
    })
}

module.exports = checkUsername