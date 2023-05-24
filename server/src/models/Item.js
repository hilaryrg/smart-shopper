const Model = require("./Model.js")

class Item extends Model {

    static get tableName() {
        return ("items")
    }
    
    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: {
                    type: "string"
                },
                availability: {
                    type: "string",
                    enum: ["in stock", "out of stock"]
                },
                status: {
                    type: "string",
                    enum: ["in cart", "not available", "substituted"]
                }
                //eventually add categoryId
            }
        }
    }

    static get relationMappings() {
        const { List, ListItems } = require("./index.js")
        return {
            listItems: {
                relation: Model.HasManyRelation,
                modelClass: ListItems,
                join: {
                    from: "items.id",
                    to: "listItems.itemId"
                }
            },
            lists: {
                relation: Model.ManyToManyRelation,
                modelClass: List,
                join: {
                    from: "items.id",
                    through: {
                        from: "listItems.itemId",
                        to: "listItems.listId",
                    },
                    to: "lists.id"
                }
            }
        }
    }
}

module.exports = Item