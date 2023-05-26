import React, { useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { Redirect } from "react-router-dom"

const NewListForm = props => {
    const defaultList = {
        name: "",
        description: "",
        type: "",
        store: "",
        status: "",
        id: null
    }

    const [newList, setNewList] = useState(defaultList)
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postNewList = async () => {
        try {
            const response = await fetch("/api/v1/lists", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {list: newList})
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage)
                }
            } else {
                const body = await response.json()
                setNewList(body.list)
                setShouldRedirect(true)
            }
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }

    const clearForm = () => {
        setNewList(defaultList)
    }

    const handleInputChange = event => {
        setNewList({
            ...newList,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        postNewList()
        clearForm()
    }

    if(shouldRedirect === true) {
        return <Redirect push to={`/lists/${newList.id}`} />
    }

    return (
        <div className="new-list-form-background">
            <div className="new-list-form">
                <h1 className="new-list-form-header">New List</h1>
                <ErrorList errors={errors}/>
                <form onSubmit={handleSubmit}>
                    <label className="new-list-form-label">
                        Name
                        <input
                            className="new-list-form-input"
                            type="text"
                            name="name"
                            placeholder="Weekly Grocery List"
                            onChange={handleInputChange}
                            value={newList.name}
                        />
                    </label>
                    <label className="new-list-form-label">
                        Description
                        <input
                            className="new-list-form-input"
                            type="text"
                            name="description"
                            placeholder="This is my weekly grocery list that includes all of the ingredients needed for my M-F meal prep"
                            onChange={handleInputChange}
                            value={newList.description}
                        />
                    </label>
                    <label className="new-list-form-label">
                        Type
                        <select
                            className="new-list-form-input"
                            name="type"
                            id="type"
                            onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="grocery">Grocery</option>
                            <option value="drugstore">Drugstore</option>
                            <option value="general">General</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label className="new-list-form-label">
                        Store
                        <select
                            className="new-list-form-input"
                            name="store"
                            id="store"
                            onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="target">Target</option>
                            <option value="trader joe\'s">Trader Joe's</option>
                            <option value="star market">Star Market</option>
                            <option value="amazon">Amazon</option>
                            <option value="cvs">CVS</option>
                            <option value="walgreens">Walgreens</option>
                        </select>
                    </label>
                    <label className="new-list-form-label">
                        Status
                        <select
                            className="new-list-form-input"
                            name="status"
                            id="status"
                            onChange={handleInputChange}>
                            <option value="to do">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </label>
                    <input
                        className="new-list-form-button"
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        </div>
    )

}

export default NewListForm