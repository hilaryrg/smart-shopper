import { Item, List } from "../../models/index.js"

class ItemSeeder {
    static async seed() {
    const list1 = await List.query().findOne({ name: "Test Grocery List" })
    const list2 = await List.query().findOne({ name: "Test Drugstore List" })
    const list3 = await List.query().findOne({ name: "Test Grocery List 2" })
    
        // const items =[{
        //     name: "paper towels"},
        // {
        //     name: "shampoo"
        // },
        // {
        //     name: "spaghetti",
        //     status: "in cart"
        // },
        // {
        //     name: "cucumbers"
        // },
        // {
        //     name: "ground turkey",
        //     availability: "out of stock",
        //     status: "substituted"
        // },
        // {
        //     name: "butter",
        //     status: "in cart"
        // },
        // {
        //     name: "parmesan cheese"
        // },
        // {
        //     name: "m&ms"
        // },
        // {
        //     name: "tomatoes",
        //     status: "in cart"
        // },
        // {
        //     name: "spinach"
        // }]


        for (const user of users) {
            const inDB = await User.query().findOne( {username: user.username} )
            if (!inDB) {
                await User.query().insert(user)
                //add relation querys that are written below
            }
        }
const shampoo = await Item.query().insertAndFetch({name: "shampoo"})
const cucumbers = await Item.query().insertAndFetch({name: "cucumbers"})
const broccoli = await Item.query().insertAndFetch({name: "broccoli"})
        await shampoo.$relatedQuery("lists").relate( list1.id );
        await shampoo.$relatedQuery("lists").relate( list2.id );
        await shampoo.$relatedQuery("lists").relate( list3.id );
        await cucumbers.$relatedQuery("lists").relate( list3.id );
        await broccoli.$relatedQuery("lists").relate( list3.id )

    }
}

export default ItemSeeder