const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// check username & password validation in login request(post) and create a new jwt token on successfull validayion
// then send back that jwt token to front end and setup auth such that, only user request which has jwt token can access daashboard content
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' });
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d', });

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = { login, dashboard };