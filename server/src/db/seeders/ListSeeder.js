import { List, User } from "../../models/index.js"

class ListSeeder {
    static async seed() {
    const user1 = await User.query().findOne({ email: "yukon@example.com" })
    const user2 = await User.query().findOne({ email: "hilary@example.com" })
    const user3 = await User.query().findOne({ email: "alisal@example.com" })

        const lists = [{
            name: "Test Grocery List",
            description: "This is a grocery list from the seeder to be used as a test.",
            type: "grocery",
            store: "star market",
            status: "to do",
            userId: user1.id,
        },
        {
            name: "Test Drugstore List",
            description: "This is a drugstore list from the seeder to be used as a test.",
            type: "drugstore",
            store: "cvs",
            status: "in progress",
            userId: user1.id,
        },
        {
            name: "Test Grocery List 2",
            description: "This is a grocery list (2) from the seeder to be used as a test.",
            type: "grocery",
            store: "target",
            status: "to do",
            userId: user2.id,
        },
        {
            name: "Test List with missing information",
            description: "This test list does not have a store value",
            type: "general",
            status: "to do",
            userId: user3.id,
        }]

        for (const list of lists) {
            const inDB = await List.query().findOne( {name: list.name} )
            if (!inDB) {
                await List.query().insert(list)
            }
        }
    }
}

export default ListSeeder