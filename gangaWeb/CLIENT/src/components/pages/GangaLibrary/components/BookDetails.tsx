import React, { useState, useEffect, useContext } from "react"
import { useGetBookQuery } from "../../../../generated"
import CircularProgress from "@material-ui/core/CircularProgress"

const BookDetails = ({ bookID }) => {
    console.log(bookID)
    const { data, loading, error } = useGetBookQuery({
        variables: {
            id: bookID,
        },
    })

    const displayBookDetails = () => {
        console.log(data)
        const book = data.getBook
        const booksByAuthor = data.getBook.authoredBy.book
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <h4>Status: {book.status}</h4>
                    <p>{book.genre}</p>
                    <p>{book.authoredBy.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {booksByAuthor?.map((item) => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return <div>No Book Selected ...</div>
        }
    }

    return (
        <div id="book-details">
            <h2>INSTRUCTIONS for Use of Hostel Library</h2>
            <ul>
                <li>Go through the Book Database to check the availability of your book.</li>
                <li>
                    Message the Literary Secretary at +918086746304 (WhatsApp/ SMS) to schedule a
                    time where you can pick up the book(s) from his room.
                </li>
                <li>
                    Collect the book(s) from the secretary at appropriate time after filling the
                    form available with him
                </li>
                <li>
                    Return the book(s) within specified time, usually 3 months, or renew the
                    borrowal
                </li>
                <li>
                    The borrower will be responsible for any sort of damage/loss of the borrowed
                    book(s)
                </li>
                <li>
                    If a book is not available/ borrowed already, one can use the location details
                    provided on the sheet to ask the person who has it to return the book. [Any
                    exchange that happens informally among students should be notified to the
                    secretary immediately]
                </li>
            </ul>

            <p>
                {bookID == null ? (
                    "SELECT A BOOK"
                ) : loading ? (
                    <CircularProgress />
                ) : !!error ? (
                    <strong>"Unable to fetch data from server!!!"</strong>
                ) : (
                    displayBookDetails()
                )}
            </p>
        </div>
    )
}

export default BookDetails
