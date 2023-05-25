import React, { useState, useEffect } from "react"

const ListShow = (props) => {
    const [list, setList] = useState({
        name: "",
        description: "",
        type: "",
        store: "",
        status: "",
        items: []
    })

    const listId = props.match.params.id
    
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

    const toProperCase = (str) => {
        if (!str) return ""
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }

    const listItems = list.items.map(item => {
        return (
            <li key={item.id}>{item.name}</li>
        )
    })

    return (
        <div className="row">
            <div className="list-show-page">
                <div className="grid-container">
                    <div className="grid-x grid-margin-x">
                        <div className="small-12 medium-8 large-8 list-show-info">
                            <h1 className="list-show-list-name">{list.name}</h1>
                            <div className="list-show-list-body">
                                <p>Description: {toProperCase(list.description)}</p>
                                <p>List Type: {toProperCase(list.type)}</p>
                                <p>Store: {toProperCase(list.store)}</p>
                                <h3 className="list-show-list-item-header">Items</h3>
                                <ul>
                                    {listItems}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListShow