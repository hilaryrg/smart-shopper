import express from "express"
import { List } from "../../../models/index.js"
import ListSerializer from "../../../db/serializers/ListsSerializer.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import listItemsRouter from "./listItemsRouter.js"

const listsRouter = new express.Router()
listsRouter.use("/:listId/items", listItemsRouter)

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
        const userId = req.user.id
        cleanedInput.userId = userId
        const list = await List.query().insertAndFetch(cleanedInput)
        res.status(201).json({ list: list })
    } catch (err) {
        console.log(err)
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({errors: err.message })
        }
    }
})

listsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const list = await List.query().findById(id)
        const serializedList = await ListSerializer.serializedList(list)
        return res.status(200).json({ list: serializedList })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ errors: err.message })
    }
})

export default listsRouter