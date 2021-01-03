const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('member').count();

        const members = await connection('member')
            .join('team', 'team_id', '=', 'member.team_id')
            .limit(10)
            .offset((page - 1) * 10)
            .select(['member.*', 'team.name'])

        response.header('X-Total-Count', count['count(*)']);

        return response.json(members);
    },

    async create(request, response) {
        const { name, email, birthdate, phone, is_active, team_id } = request.body;

        const [id] = await connection('member').insert({
            name,
            email,
            birthdate,
            phone,
            is_active,
            team_id
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        const member = await connection('member')
            .where('id', id)
            .first();

        await connection('member').where('id', id).delete()
        return response.status(204).send();
    }

}