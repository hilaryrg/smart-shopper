class ItemSerializer {
    static showItemDetails(itemArray) {
        const newItems = listArray.map(list=> {
            return {
                id: item.id,
                name: item.name,
                availability: item.availability,
                status: item.status,
            }
        })
        return newItems
    }

    static serializedItem(item) {
        const allowedAttributes = ["id", "name", "availability", "status"]
        let newItem = {}
        for (const attribute of allowedAttributes) {
            newItem[attribute] = item[attribute]
        }
        return newItem
    }
}

export default ItemSerializer