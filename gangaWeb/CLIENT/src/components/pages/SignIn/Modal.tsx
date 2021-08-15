import React, { Fragment, useContext, useEffect, useCallback } from "react"
import styled from "styled-components"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Button from "@material-ui/core/Button"
import * as ROUTES from "../../../constants/routes"

import DialogTitle from "@material-ui/core/DialogTitle"
import GoogleLogin from "react-google-login"
import { useLoginMutation, refetchMeQuery, useGoogleSignInMutation } from "../../../generated"
import AuthUserContext from "../../../contexts/session"
interface ContainerProps {
    children: React.ReactNode
    className?: string
}
const regex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
export const PageTitle = styled.section`
    flex: 1;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
`
export default ({ isOpen, onClose, role, value }) => {
    const { setAuthUser } = useContext(AuthUserContext)
    const actions = [{ text: "Close", onClick: onClose }]
    const [login, { data, loading, error }] = useLoginMutation({
        refetchQueries: [refetchMeQuery()],
    })
    const [
        googleLogin,
        { data: googleData, loading: googleLoading, error: googleError },
    ] = useGoogleSignInMutation({
        refetchQueries: [refetchMeQuery()],
    })
    const handleSubmit = useCallback((data: any) => {
        try {
            login({
                variables: {
                    email: data.email,
                    password: data.password,
                },
            })
        } catch (err) {
            console.log(err)
        }
    }, [])
    const responseGoogle = useCallback(
        (data: any) => {
            try {
                console.log(data.profileObj)
                console.log(data)
                googleLogin({
                    variables: {
                        email: data.profileObj.email,
                        name: data.profileObj.givenName,
                        googleId: data.googleId,
                        role: value.value,
                    },
                })
            } catch (err) {
                console.log(err)
            }
        },
        [value]
    )
    useEffect(() => {
        if (data?.login) {
            localStorage.setItem("authUser", JSON.stringify(data.login.user))
            localStorage.setItem("authToken", data.login.token)
            setAuthUser(data.login.user)
            onClose()
            window.location.pathname = ROUTES.COMPLAINTPORTAL
        }
    }, [data])

    useEffect(() => {
        if (googleData && googleData.googleSignIn) {
            localStorage.setItem("authUser", JSON.stringify(googleData.googleSignIn.user))
            localStorage.setItem("authToken", googleData.googleSignIn.token)
            setAuthUser(googleData.googleSignIn.user)
            onClose()
            window.location.pathname = "/"
        }
    }, [googleData])

    if (error || googleError) console.log(error?.message, googleError)
    return googleLoading ? (
        <CircularProgress />
    ) : (
        <Dialog
            open={isOpen}
            onClose={onClose}
            //            components={{
            //                Container: ({ children, className }: ContainerProps) => (
            //                    <Form onSubmit={handleSubmit}>
            //                        {({ formProps }) => (
            //                            <form {...formProps} className={className}>
            //                                {children}
            //                            </form>
            //                        )}
            //                    </Form>
            //                ),
            //            }}
        >
            <DialogTitle id="form-dialog-title">{`${role} Login`}</DialogTitle>
            <br />
            <DialogContent>
                <GoogleLogin
                    clientId="595389018304-0beev6shgamm90rlbgr3hjhc4gd5tk06.apps.googleusercontent.com"
                    buttonText={role === "Student" ? "Login with Smail" : "Login using Google"}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    hostedDomain={role === "Student" && "smail.iitm.ac.in"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
