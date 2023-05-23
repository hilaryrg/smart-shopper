const Model = require("./Model.js")

class List extends Model {

    static get tableName() {
        return ("lists")
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "description", "userId"],
            properties: {
                name: {
                    type: "string"
                },
                description: {
                    type: "string", minLength: 5 
                },
                type: {
                    type: "string",
                    enum: ["grocery", "drugstore", "general", "other"] 
                },
                store: { 
                    type: "string",
                    enum: ["target", "trader joe\'s", "star market", "amazon", "cvs", "walgreens"]
                },
                status: { 
                    type: "string",
                    enum: ["to do", "in progress", "done"] 
                },
                userId: { 
                    type: ["integer", "string"] 
                }
            }
        }
    }

    static get relationMappings() {
        const { User } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "lists.userId",
                    to: "users.id"
                }
            }
        }
    }

}

module.exports = List