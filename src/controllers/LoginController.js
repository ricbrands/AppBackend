
module.exports = {

    async login(request, response) {
       if ( request.body.user === 'user' && request.body.password === '123' ) {
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