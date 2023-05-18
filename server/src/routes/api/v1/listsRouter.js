import express from "express"
import { List } from "../../../models/index.js"
import ListSerializer from "../../../db/serializers/ListsSerializer.js"

const listsRouter = new express.Router()

listsRouter.get("/", async (req, res) => {
    try {
        const lists = await List.query()
        const serializedLists = ListSerializer.showListDetails(lists)
        res.status(200).json( { lists: serializedLists})
    } catch(err) {
        res.status(500).json( { errors: err })
    }
})

export default listsRouter