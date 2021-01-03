const express = require("express");
const routes = express.Router();

const MemberController = require('./controllers/MemberController');
const TeamController = require("./controllers/TeamController");

routes.get('/member', MemberController.index)
routes.post('/member', MemberController.create)
routes.delete('/member/:id', MemberController.delete)

routes.get('/team', TeamController.index)

module.exports = routes