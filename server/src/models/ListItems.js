const Model = require("./Model")

class ListItems extends Model {
    static get tableName() {
        return "listItems"
    }

    static get relationMappings() {
        const { List, Item } = require("./index.js")

        return {
            list: {
                relation: Model.BelongsToOneRelation,
                modelClass: List,
                join: {
                    from: "listItems.listId",
                    to: "lists.id"
                }
            },
            item: {
                relation: Model.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: "listItems.itemId",
                    to: "items.id"
                }
            }
        }
    }
}

module.exports = ListItems