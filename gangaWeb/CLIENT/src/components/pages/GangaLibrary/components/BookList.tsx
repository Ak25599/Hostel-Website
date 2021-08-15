import React, { useState, useEffect, useContext } from "react"
import { useGetBooksQuery } from "../../../../generated"
import CircularProgress from "@material-ui/core/CircularProgress"

import BookDetails from "./BookDetails"

const BookList = () => {
    const { data, loading, error } = useGetBooksQuery({
        variables: {
            type: "ALL",
        },
    })
    const [selected, setSelected] = useState(null)

    // state = {
    //     selected: null,
    // }
    useEffect(() => {
        if (error) console.log("error", error)
    }, [error])
    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data])

    const displayBooks = () => {
        if (loading) {
            return <CircularProgress />
        } else {
            console.log(data)
            return data.getBooks.map((book) => {
                return (
                    <li
                        key={book.id}
                        onClick={(e) => {
                            setSelected(book.id)
                        }}
                    >
                        {book.name}
                    </li>
                )
            })
        }
    }

    return (
        <div>
            <ul id="book-list">{displayBooks()}</ul>
            <BookDetails bookID={selected} />
        </div>
    )
}

export default BookList
