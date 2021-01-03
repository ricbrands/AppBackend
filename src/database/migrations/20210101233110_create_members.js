
exports.up = function (knex) {
    return knex.schema.createTable('member', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('birthdate').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('is_active').notNullable();
        table.string('team_id').notNullable();

        table.foreign('team_id').references('id').inTable('team');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('member');
};
