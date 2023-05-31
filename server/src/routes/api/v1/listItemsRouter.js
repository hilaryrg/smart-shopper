import express from 'express'
import { Item, List } from '../../../models/index.js'
import objection from "objection"
import { ValidationError } from 'objection'
import cleanUserInput from '../../../services/cleanUserInput.js'
import ItemSerializer from "../../../db/serializers/ItemsSerializer.js"

const listItemsRouter = new express.Router({ mergeParams: true })

listItemsRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const cleanInput = cleanUserInput(body.item)
        let { listId } = req.params
        const list = await List.query().findById(listId)
        const existingItem = await list.$relatedQuery("items").findOne({ name: cleanInput.name })
        
        if (existingItem) {
            console.log("Item already exists in the list!")
            const serializedItem = await ItemSerializer.serializedItem(existingItem)
            return res.status(400).json({ error: "Item already exists in the list!", item:serializedItem })
        } else {
            const existingItemInDatabase = await Item.query().findOne({ name: cleanInput.name })
            
            if(existingItemInDatabase) {
                console.log("Item already exists in the database...")
                await list.$relatedQuery("items").relate(existingItemInDatabase)
                const serializedItem = ItemSerializer.serializedItem(existingItemInDatabase)
                return res.status(200).json({ item: serializedItem })
        } else {
            console.log("Adding item to list & database...")
            const newItem = await Item.query().insertAndFetch(cleanInput)
            await list.$relatedQuery("items").relate(newItem)
            const serializedItem = await ItemSerializer.serializedItem(newItem)
            res.status(201).json({ item: serializedItem })
        }
    }

    } catch(err) {
        console.log(err)
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({ errors: err.message})
        }
    }
})

export default listItemsRouter