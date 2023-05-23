import React, { useState, useEffect } from "react"

const ListShow = (props) => {
    const [list, setList] = useState({
        name: "",
        description: "",
        type: "",
        store: "",
        status: ""
    })

    const listId = props.match.params.id
    console.log(listId)
    
    const getList = async() => {
        try{
            const response = await fetch(`/api/v1/lists/${listId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setList(body.list)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className="list-show-page">
            <h1 className="list-show-list-name">{list.name}</h1>
            <div className="list-show-list-body">
                <p>{list.description}</p>
                <p>{list.type}</p>
                <p>{list.store}</p>
            </div>
        </div>
    )
}

export default ListShow