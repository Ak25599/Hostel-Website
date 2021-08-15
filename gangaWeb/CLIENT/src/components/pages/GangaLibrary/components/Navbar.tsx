import React, { Component, useContext } from "react"
import { Link, withRouter } from "react-router-dom"
import AuthUserContext from "../../../../contexts/session"
import { AuthUserObject } from "../../../../interfaces"
import {
    Button,
} from "@material-ui/core"

import { UserRole } from "../../../../generated"
import {useLocation, useHistory } from "react-router-dom"
import * as ROUTES from "../../../../constants/routes"

const Navbar = () => {
    const { authUser, setAuthUser } = useContext(AuthUserContext)
    const { push } = useHistory()
    const { pathname } = useLocation()

    return (
        <nav id="library-nav">
            <ul>
                <li>
                    <Link to="/GangaLibrary">Landing</Link>
                </li>
                <li>
                    <Link to="/AdminLibrary">Admin</Link>
                </li>
                {authUser?.id && authUser?.role == UserRole.Litsec && <Button onClick={()=>{localStorage.clear()
                            setAuthUser(null)
                            window.location.reload()
                     }} > Sign Out  </Button>}        
            
            </ul>
        </nav>
    )
}

export default Navbar
