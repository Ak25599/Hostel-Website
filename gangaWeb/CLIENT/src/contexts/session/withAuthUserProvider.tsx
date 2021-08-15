import React, { ComponentClass, StatelessComponent, useState, useEffect } from "react"

import AuthUserContext from "./context"
import { useMeQuery } from "../../generated"

export default (Component: ComponentClass | StatelessComponent) => (props: any) => {
    const [authUser, setAuthUser] = useState({})
    const { data: queryData } = useMeQuery({
        fetchPolicy: "network-only",
    })

    useEffect(() => {
        if (queryData?.me) {
            setAuthUser(queryData.me)
            localStorage.setItem("authUser", JSON.stringify(queryData.me))
        }
    }, [queryData])

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            setAuthUser(JSON.parse(localStorage.getItem("authUser")))
        }
    }, [])

    return (
        <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
            <Component {...props} />
        </AuthUserContext.Provider>
    )
}
