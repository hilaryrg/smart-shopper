class ListSerializer {
    static showListDetails(listArray) {
        const newLists = listArray.map(list=> {
            return {
                id: list.id,
                name: list.name,
            }
        })
        return newLists
    }

    static async serializeList(list) {
        const allowedAttributes = ["id", "name", "description", "type", "store", "status", "userId"]
        let newList = {}
        for (const attribute of allowedAttributes) {
            newList[attribute] = list[attribute]
        }
    }
}

export default ListSerializer