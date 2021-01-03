const jwt = require('jsonwebtoken');
const connection = require('../database/connection');

module.exports = {

    async login(request, response) {

        const { login, password } = request.body

        const user = await connection('user').where('login', login).where('password', password)
        console.log(user)
        if ( user.length > 0 ) {
            const id = user.id
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            })

            return response.json({auth: true, token: token})
        }
       return response.status(500).json({message: 'Login inválido!'})
    },

    async logout(request, response) {
        response.json({auth: false, token: null})
    }

}