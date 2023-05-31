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
            return res.status(400).json({ error: "Item already exists in the list!" })
        } else {
            console.log("Adding item to list...")
            const newItem = await list.$relatedQuery("items").insert(cleanInput)
            const id = cleanInput.listId
            console.log(cleanInput)
            const serializedItem = await ItemSerializer.serializedItem(newItem)
            res.status(201).json({ item: serializedItem })
        }
        
        // retrieve all existing items on this list
        // check to see if the new item's name is in the list... probably use 
        // if it is in the list, return a response with an error saying it already on the list
        // otherwise, do the following...

        // use the Item.fineOne method to see if the item exists in the db
            // if it does
                // relate the existing item to the list (see code in Item seeder)
            // if it does not use the code below

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