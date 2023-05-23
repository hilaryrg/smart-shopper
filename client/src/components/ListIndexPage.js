import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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

    useEffect(() => {
        getLists()
    }, [])

    const listsList = lists.map(list => {
        return (
            <div className="list-index-page-callout">
                <Link className="list-index-list-name" to={`/lists/${list.id}`}> {`${list.name}`} </Link>
                <p>{list.status}</p>
            </div>
        )
    })

    return (
        <div className="list-index-page">
            <h2 className="list-index-header">My Lists</h2>
            <p>{listsList}</p>
            <Link className="new-list-link-button" to="/lists/new">New List</Link>
        </div>
    )
}

export default ListIndex