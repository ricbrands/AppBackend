const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('team').count();

        const teams = await connection('team')
            .limit(10)
            .offset((page - 1) * 10)
            .select(['team.*'])

        response.header('X-Total-Count', count['count(*)']);

        return response.json(teams);
    }

}