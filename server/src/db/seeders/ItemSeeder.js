import { Item, List } from "../../models/index.js"

class ItemSeeder {
    static async seed() {
    const list1 = await List.query().findOne({ name: "Test Grocery List" })
    const list2 = await List.query().findOne({ name: "Test Drugstore List" })
    const list3 = await List.query().findOne({ name: "Test Grocery List 2" })

    const items = [
        { 
            name: "paper towels", 
            lists: [list1] 
        },
        { 
            name: "shampoo", 
            lists: [list1, list2, list3] 
        },
        { 
            name: "spaghetti", 
            status: "in cart", 
            lists: [list1, list3] 
        },
        { 
            name: "cucumbers", 
            lists: [list1] 
        },
        { 
            name: "ground turkey", 
            availability: "out of stock", 
            status: "substituted", 
            lists: [list3] 
        },
        { 
            name: "butter", 
            status: "in cart", 
            lists: [list3] 
        },
        { 
            name: "parmesan cheese", 
            lists: [list1] 
        },
        { 
            name: "m&ms", 
            lists: [list2, list3] 
        },
        { 
            name: "tomatoes", 
            status: "in cart", 
            lists: [list1, list3] 
        },
        {
            name: "spinach", 
            lists: [list1] 
        }
    ];

    for (const itemData of items) {
        const { name, lists, ...itemProps } = itemData
        let item = await Item.query().findOne({ name })

        if (!item) {
            item = await Item.query().insert({ name, ...itemProps })

        if (lists) {
            const listIds = lists.map(list => list.id)
            await item.$relatedQuery("lists").relate(listIds)
        }
        }
    }
    }
}

export default ItemSeeder