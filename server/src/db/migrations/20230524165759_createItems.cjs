/**
 * @typedef {import("knex")} Knex
 */

const { transform } = require("lodash")

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("items", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.enum("availability", ["in stock", "out of stock"])
        table.enum("status", ["in cart", "not available", "substituted"]),
        //eventually add categoryId reference
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("items")
}
