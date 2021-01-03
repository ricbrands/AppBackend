
exports.up = function (knex) {
    return knex.schema.createTable('team', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('city').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('team');
};
