import React, { useContext, ComponentClass, StatelessComponent } from "react"
import { useHistory } from "react-router-dom"
import AuthUserContext from "."
import { AuthUserObject } from "../../interfaces"

export default (
    condition: (authUser: AuthUserObject["authUser"] | null) => boolean,
    redirect: string
) => (Component: ComponentClass | StatelessComponent) => (props: any) => {
    const { authUser }: AuthUserObject | null = useContext(AuthUserContext)

    console.log(authUser)

    if (!condition(authUser)) {
        if (typeof window !== "undefined") useHistory().push(redirect)
        return <div>Redirecting..</div>
    }
    return <Component {...props} />
}
