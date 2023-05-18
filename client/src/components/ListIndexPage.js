import React, { useState, useEffect } from "react"

const ListIndex = props => {
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
            <p> {`${list.name}`} </p>
        )
    })

    return (
        <div>
            <h2>My Lists</h2>
            <p>{listsList}</p>
        </div>
    )
}

export default ListIndex