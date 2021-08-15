import React, { Component, useContext } from "react"
import Navbar from "./components/Navbar"
import BookList from "./components/BookList"
import AuthUserContext from "../../../contexts/session"
import { UserRole } from "../../../generated"

import {useLocation, useHistory } from "react-router-dom"
import * as ROUTES from "../../../constants/routes"

const App = () => {
    const { authUser, setAuthUser } = useContext(AuthUserContext)
    const { push } = useHistory()
    const { pathname } = useLocation()

    return (
        <div className="main">
            <h1 style={{ color: "black" }}>Ganga Library</h1>
            
            {authUser?.id && authUser?.role == UserRole.Litsec && <Navbar />}
                        
            <BookList />
        </div>
    )
}

export default App
