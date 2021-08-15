import React, { useState, ChangeEvent, FormEvent, useEffect, useContext } from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useCreateComplaintMutation } from "../../../generated"
import CircularProgress from "@material-ui/core/CircularProgress"
import { UploadFile, DetailsForm } from "."
import MenuItem from "@material-ui/core/MenuItem"

import { AuthUserObject } from "../../../interfaces"
import AuthUserContext, { withAuthorization } from "../../../contexts/session"
import * as ROUTES from "../../../constants/routes"
import { UserRole } from "../../../generated"
import { Select, InputLabel } from "@material-ui/core"

import {useLocation, useHistory} from "react-router-dom"

const condition = (authUser: AuthUserObject["authUser"] | null) => !!authUser.id

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(1, 0),
        },

        form: {
            backgroundColor: "white",
            padding: theme.spacing(4, 4, 8),
            minHeight: 440,
            boxShadow: `2px 2px 2px 2px grey`,
        },

        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },

        submit: {
            margin: theme.spacing(3, -1, 4),
        },
    })
)

export default (props) => {
    const { authUser } = useContext(AuthUserContext)
    return withAuthorization(
        condition,
        ROUTES.LOGIN
    )(() => {
        const { authUser, setAuthUser } = useContext(AuthUserContext)
        const { push } = useHistory()
        const { pathname } = useLocation()
    
        const classes = useStyles()
        const [open, setOpen] = useState(false)
        const [success, setSuccess] = useState(false)
        const [submit, { data, loading, error }] = useCreateComplaintMutation()
        const [complaints, setComplaints] = useState([
            "Dispenser Cage",
            "Washroom Pipe",
            "Leakage",
            "Others",
        ])
        const [{ roomNumber, floor, complaint, description }, setValues] = useState({
            roomNumber: "",
            floor: "",
            complaint: "",
            description: "",
        })

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            e.persist()
            setValues((prevValues) => ({
                ...prevValues,
                [e.target.name]: e.target.value,
            }))
        }

        useEffect(() => {
            if (data) {
                console.log(data)
                setOpen(true)
            }
        }, [data])

        const handleClose = () => {
            setOpen(false)
        }

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            try {
                submit({
                    variables: {
                        roomNumber,
                        floor,
                        description,
                        complaint,
                    },
                })
            } catch (err) {
                console.log(err)
            }
        }

        if (error) console.log(error)

        if (success)
            return (
                <DetailsForm
                    id={data.createComplaint.id}
                    smail={data.createComplaint.smail}
                    complaint={data.createComplaint.complaint}
                    description={data.createComplaint.description}
                    floor={data.createComplaint.floor}
                />
            )

        return (
            <Grid>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Complaint Portal
                    </Typography>
                    {authUser?.id && authUser?.role == UserRole.Student && <Button onClick={()=>{localStorage.clear()
                            setAuthUser(null)
                            window.location.reload()
                     }} > Sign Out  </Button>}        

                    <form noValidate onSubmit={handleSubmit} className={classes.form}>
                        <Typography component="h1" variant="h6" color="textSecondary">
                            Please fill in the details...
                        </Typography>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={2} /> */}
                            <Grid item xs={12}>
                                <Grid container justify="space-between">
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            // fullWidth
                                            id="roomNumber"
                                            label="Room Number"
                                            name="roomNumber"
                                            onChange={handleChange}
                                            value={roomNumber}
                                            type="number"
                                            style={{ marginRight: 8 }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            id="floor"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Floor"
                                            name="floor"
                                            onChange={handleChange}
                                            value={floor}
                                            type="number"
                                            autoFocus
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    id="complaint"
                                    name="complaint"
                                    onChange={handleChange}
                                    variant="outlined"
                                    label="Category"
                                    fullWidth
                                    select
                                    margin="normal"
                                >
                                    {complaints.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    onChange={handleChange}
                                    value={description}
                                    multiline
                                    rows="4"
                                />
                                <Button
                                    type="submit"
                                    disabled={!floor || !complaint}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {loading ? <CircularProgress /> : "Upload File"}
                                </Button>
                                {data && (
                                    <UploadFile
                                        open={open}
                                        handleClose={handleClose}
                                        name={complaint + floor}
                                        setSuccess={setSuccess}
                                        id={data.createComplaint.id}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        )
    })(props)
}
