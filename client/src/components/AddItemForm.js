import React, { useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"

const AddItemForm = (props) => {
    const listId = props.listId
    const defaultItem = {
        name: ""
    }

    const [newItem, setNewItem] = useState(defaultItem)
    const [errors, setErrors] = useState([])

    const postNewItem = async () => {
        try {
            const response = await fetch(`/api/v1/lists/${listId}/items`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {item: newItem})
            })
            if (!response.ok) {
                if(response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage.error)
                }
            }
            const responseBody = await response.json()
            props.setList((prevList) => ({
                ...prevList,
                items: [...prevList.items, responseBody.item]
            }))
            clearForm()
            setErrors([])
        } catch(error) {
            console.error("Error in fetch", error.message)
        }
    }

    const clearForm = () => {
        setNewItem(defaultItem)
    }

    const handleInputChange = event => {
        setNewItem({
            ...newItem,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        postNewItem()
        clearForm()
    }

    return (
        <div>
            <h2 className="add-new-item-form-header">Add a New Item</h2>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        className="add-new-item-form-input"
                        type="string"
                        name="name"
                        onChange={handleInputChange}
                        value={newItem.name}
                    />
                </label>
                <input className="add-new-item-form-button" type="submit" value="Add" />
            </form>
        </div>
    )

}

export default AddItemForm