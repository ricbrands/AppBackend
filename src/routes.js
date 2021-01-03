const express = require("express");
const LoginController = require("./controllers/LoginController");
const jwt = require('jsonwebtoken')
const routes = express.Router();

const MemberController = require('./controllers/MemberController');
const TeamController = require("./controllers/TeamController");

function verifyJWT(request, response, next) {
    const token = request.headers['x-access-token'];
    if ( !token ) return response.status(401).json({auth: false, message: 'No token provided.'})

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if ( err ) return response.status(500).json({auth: false, message: 'Failed to authenticate token'})

        request.userId = decoded.id;
        next();
    });
}

routes.post('/login', LoginController.login)
routes.get('/member', verifyJWT, MemberController.index)
routes.post('/member', verifyJWT, MemberController.create)
routes.delete('/member/:id', verifyJWT, MemberController.delete)

routes.get('/team', TeamController.index)

module.exports = routes