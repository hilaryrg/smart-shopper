class ListSerializer {
    static showListDetails(listArray) {
        const newLists = listArray.map(list=> {
            return {
                id: list.id,
                name: list.name,
                description: list.description,
                type: list.type,
                store: list.store,
                status: list.status 
            }
        })
        return newLists
    }

    static async serializedList(list) {
        const allowedAttributes = ["id", "name", "description", "type", "store", "status", "userId"]
        let newList = {}
        for (const attribute of allowedAttributes) {
            newList[attribute] = list[attribute]
        }
        newList.items = await list.$relatedQuery("items")
        return newList
    }
}

export default ListSerializer