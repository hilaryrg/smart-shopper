/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("lists", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.text("description").notNullable()
        table.enum("type", ["grocery", "drugstore", "general", "other"])
        table.string("store", ["target", "trader joe\'s", "star market", "amazon", "cvs", "walgreens"])
        table.string("status", ["to do", "in progress", "done"])
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("lists")
}