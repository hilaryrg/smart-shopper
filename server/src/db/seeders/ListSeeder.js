import { List } from "../../models/index.js"

class ListsSeeder {
    static async seed()
    {
        const lists = [{
            name: "Test Grocery List",
            description: "This is a grocery list from the seeder to be used as a test.",
            type: "grocery",
            store: "star market",
            status: "to do",
            userId: "1",
        },
        {
            name: "Test Drugstore List",
            description: "This is a drugstore list from the seeder to be used as a test.",
            type: "drugstore",
            store: "cvs",
            status: "in progress",
            userId: "1",
        },
        {
            name: "Test Grocery List 2",
            description: "This is a grocery list (2) from the seeder to be used as a test.",
            type: "grocery",
            store: "target",
            status: "to do",
            userId: "2",
        },
        {
            name: "Test List with missing information",
            description: "This test list does not have a store value",
            type: "general",
            status: "to do",
            userId: "3",
        }]
        for (const list of lists) {
            await List.query().insert(list)
        }
    }
}

export default ListsSeeder