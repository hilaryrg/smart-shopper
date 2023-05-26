class ItemSerializer {
    static showItemDetails(itemArray) {
        const newItems = itemArray.map(item => {
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

    static serializedItems(items) {
        return items.map(item => this.serializedItem(item))
    }
}

export default ItemSerializer