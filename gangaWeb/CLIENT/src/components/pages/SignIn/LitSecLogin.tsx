import React, { FormEvent, useState, ChangeEvent, useEffect, useContext } from "react"
import { Grid, Typography, TextField, Button } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { useLitSecLoginMutation, UserRole } from "../../../generated"
import * as ROUTES from "../../../constants/routes"
import AuthUserContext, { withAuthorization } from "../../../contexts/session"
import { AuthUserObject } from "../../../interfaces"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        form: {
            backgroundColor: "white",
            boxShadow: "10px 0 10px 2px rgba(0,0,0,0.4)",
        },
        root: {
            width: "100%",
        },
        submit: {
            margin: theme.spacing(3, 0),
        },
    })
)

const condition = (authUser: AuthUserObject["authUser"] | null) => !authUser.id

export default (props) => {
    const { authUser, setAuthUser } = useContext(AuthUserContext)
    return withAuthorization(
        condition,
        authUser.role == UserRole.Litsec ? ROUTES.GANGALIBRARY : ROUTES.GANGALIBRARY
    )(() => {
        const [{ email, password }, setLoginValues] = useState({
            email: "",
            password: "",
        })

        const [litSecLogin, { data, loading, error }] = useLitSecLoginMutation()

        const classes = useStyles()

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            e.persist()
            setLoginValues((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
        }

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            try {
                litSecLogin({
                    variables: {
                        email,
                        password,
                    },
                })
            } catch (err) {
                console.log(err)
            }
        }

        useEffect(() => {
            if (data?.litSecLogin) {
                localStorage.setItem("authUser", JSON.stringify(data.litSecLogin.user))
                localStorage.setItem("authToken", data.litSecLogin.token)
                setAuthUser(data.litSecLogin.user)
                window.location.pathname = ROUTES.GANGALIBRARY
            }
        }, [data])
        useEffect(() => {
            console.log(authUser)
            if (authUser.id) window.location.pathname = ROUTES.GANGALIBRARY
        }, [])

        return (
            <Grid>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        LitSec Login
                    </Typography>
                    <form noValidate onSubmit={handleSubmit} className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={email}
                                    type="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    value={password}
                                    autoFocus
                                />

                                <Button
                                    type="submit"
                                    disabled={!email || !password}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {loading ? <CircularProgress /> : "Login"}
                                </Button>
                                {error && (
                                    <Typography component="p" color="error">
                                        Invalid Credentials!
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        )
    })(props)
}
