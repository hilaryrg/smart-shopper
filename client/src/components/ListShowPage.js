import React, { useState, useEffect } from "react"
import AddItemForm from "./AddItemForm"

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

    const capFirstLetter = (str) => {
        if (!str) return ""
        const wordString = str.split(" ")
        const capitalizedWords = wordString.map((word) => {
            if (word.length === 0) {
                return word
            }
            const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            return capitalizedWord
        })
        const properCaseString = capitalizedWords.join(" ")
        return properCaseString
    }

    const listItems = list.items.map(item => {
        return (
            <li key={item.id}>{capFirstLetter(item.name)}</li>
        )
    })

    return (
        <div className="row">
            <div className="list-show-page">
                <div className="grid-container">
                    <div className="grid-x grid-margin-x">
                        <div className="small-12 medium-7 large-7 list-show-info">
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
                        <div className="small-12 medium-5 large-5 add-new-item-form">
                            <AddItemForm setList={setList} listId={listId}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListShow