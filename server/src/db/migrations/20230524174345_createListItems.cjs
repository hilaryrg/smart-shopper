/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("listItems", (table) => {
        table.bigIncrements("id")
        table
            .bigInteger("listId")
            .unsigned()
            .notNullable()
            .index()
            .references("lists.id")
        table
            .bigInteger("itemId")
            .unsigned()
            .notNullable()
            .index()
            .references("items.id")
        table
            .timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now())
        table
            .timestamp("updatedAt")
            .notNullable()
            .defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("listItems")
}
