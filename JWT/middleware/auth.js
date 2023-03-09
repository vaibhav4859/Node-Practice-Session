const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No token provided" });
    }

    try {
        const token = authHeader.split(' ')[1]; // object : {Bearer, token}
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodes my token like jwt debugger
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not authorized to access this route" });
    }
}

module.exports = authenticationMiddleware;