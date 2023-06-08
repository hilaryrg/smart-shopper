import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"

const ListIndex = (props) => {
    const [ lists, setLists ] = useState([])

    const getLists = async () => {
        try {
            const response = await fetch("/api/v1/lists")
            const responseBody = await response.json()
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            setLists(responseBody.lists)
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }
    const [shouldRedirect, setShouldRedirect] = useState(false)

    useEffect(() => {
        getLists()
    }, [])

    const deleteList = async () => {
        try {
            const response = await fetch(`/api/v1/lists/${listId}`, { method: "DELETE"})
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            setShouldRedirect(true)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const handleOnClickDeleteList = (event) => {
        event.preventDefault()
        deleteList()
    }

    const listsList = lists.map(list => {
        return (
            <div className="list-index-page-callout">
                <Link className="list-index-list-name" to={`/lists/${list.id}`}> {`${list.name}`} </Link>
                <div>{list.status}</div>
                <button 
                className="new-list-form-button"
                onClick={handleOnClickDeleteList}>
            Delete
            </button>
            </div>
        )
    })

    if (shouldRedirect) {
        return <Redirect push to="/lists" />
    }

    const deleteMessage = "Delete this list"

    return (
        <div className="list-index-page">
            <h2 className="list-index-header">My Lists</h2>
            <div>{listsList}</div>
            <Link className="new-list-link-button" to="/lists/new">New List</Link>
        </div>
    )
}

export default ListIndex