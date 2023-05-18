import express from "express"
import { List } from "../../../models/index.js"
import ListSerializer from "../../../db/serializers/ListsSerializer.js"
import { ValidationError } from "objection"

const listsRouter = new express.Router()

listsRouter.get("/", async (req, res) => {
    try {
        const user = req.user
        const lists = await user.$relatedQuery("lists")
        const serializedLists = ListSerializer.showListDetails(lists)
        res.status(200).json( { lists: serializedLists})
    } catch(err) {
        res.status(500).json( { errors: err })
    }
})

listsRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.list)
        const list = await List.query().insertAndFetch(cleanedInput)
        res.status(201).json({ list: list })
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({errors: err.message })
        }
    }
})

export default listsRouter