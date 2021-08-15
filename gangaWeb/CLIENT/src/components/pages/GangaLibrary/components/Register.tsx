import React, { useState, Component, useEffect, useContext, ChangeEvent } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import moment from "moment"

import { useGetBooksQuery, refetchGetBooksQuery, Book } from "../../../../generated"

import { useAddEntryMutation, useAddExitMutation } from "../../../../generated"
import {
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    makeStyles,
    Theme,
    createStyles,
} from "@material-ui/core"

interface RegisterEntry {
    studentName: string
    rollNumber: string
    book: Book
    issuedDate: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(1),
            display: "flex",
            flexWrap: "wrap",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
            width: "100%",
            padding: theme.spacing(1, 0),
        },

        form: {
            backgroundColor: "white",
            padding: theme.spacing(4, 4, 8),
            minWidth: 280,
            height: 360,
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

const Register = () => {
    const classes = useStyles()
    const {
        data: availableData,
        loading: availableLoading,
        error: availableError,
    } = useGetBooksQuery({
        variables: {
            type: "AVAILABLE",
        },
    })
    const { data: issuedData, loading: issuedLoading, error: issuedError } = useGetBooksQuery({
        variables: {
            type: "ISSUED",
        },
    })
    const [
        addEntry,
        { data: entryData, loading: entryLoading, error: entryError },
    ] = useAddEntryMutation()
    const [
        addExit,
        { data: exitData, loading: exitLoading, error: exitError },
    ] = useAddExitMutation()

    const [state, setState] = useState({
        studentName: "",
        rollNumber: "",
        bookID: "",
        registerEntry: null,
        registerExit: null,
        registerID: null,
    })

    console.log(entryData)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const displayAvailableBookIDs = () => {
        if (availableLoading) {
            return (
                <MenuItem disabled>
                    <CircularProgress />
                </MenuItem>
            )
        } else {
            if (availableError) {
                return
            }
            var Data = availableData.getBooks
            return Data.map((book) => {
                return (
                    <MenuItem key={book.id} value={book.bookid}>
                        {book.name}
                    </MenuItem>
                )
            })
        }
    }

    const displayExitBookIDs = () => {
        if (issuedLoading) {
            return (
                <MenuItem disabled>
                    <CircularProgress />
                </MenuItem>
            )
        } else {
            var Data = issuedData.getBooks
            return Data.map((book) => {
                const regId = book.register.filter(
                    (reg) => reg.book.id == book.id && reg.returnStatus == false
                )
                if (regId.length > 0)
                    return (
                        <MenuItem key={book.id} value={regId[0].id}>
                            {book.name}
                        </MenuItem>
                    )
            })
        }
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            addEntry({
                variables: {
                    studentName: state.studentName,
                    rollNumber: state.rollNumber,
                    bookId: state.bookID,
                },
                refetchQueries: [
                    refetchGetBooksQuery({
                        type: "AVAILABLE",
                    }),
                    refetchGetBooksQuery({
                        type: "ISSUED",
                    }),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (entryData) {
            setState({
                studentName: "",
                rollNumber: "",
                bookID: "",
                registerEntry: entryData.addEntry,
                registerExit: null,
                registerID: null,
            })
        }
        if (exitData) {
            setState({
                studentName: "",
                rollNumber: "",
                bookID: "",
                registerEntry: null,
                registerExit: exitData.addExit,
                registerID: null,
            })
        }
    }, [exitData, entryData])

    const submitExitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            addExit({
                variables: {
                    id: state.registerID,
                },
                refetchQueries: [
                    refetchGetBooksQuery({
                        type: "AVAILABLE",
                    }),
                    refetchGetBooksQuery({
                        type: "ISSUED",
                    }),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.paper}>
            <form noValidate onSubmit={submitForm} className={classes.form}>
                <Typography component="h1" variant="h6" color="textSecondary">
                    New Entry
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
                                    id="studentName"
                                    label="Student Name"
                                    name="studentName"
                                    onChange={handleChange}
                                    value={state.studentName}
                                    type="text"
                                    autoFocus
                                    style={{ marginRight: 8 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    id="rollNumber"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Roll Number"
                                    name="rollNumber"
                                    onChange={handleChange}
                                    value={state.rollNumber}
                                    type="text"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            id="bookID"
                            name="bookID"
                            onChange={handleChange}
                            variant="outlined"
                            label="Book Name"
                            fullWidth
                            select
                            margin="normal"
                        >
                            {displayAvailableBookIDs()}
                        </TextField>
                        <Button
                            type="submit"
                            disabled={!state.studentName || !state.rollNumber || !state.bookID}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {entryLoading ? <CircularProgress /> : "Register Entry"}
                        </Button>
                    </Grid>
                </Grid>
                <StudentEntryDetails registerEntry={state.registerEntry} />
            </form>
            <form id="register-exit" onSubmit={submitExitForm} className={classes.form}>
                <Typography component="h1" variant="h6" color="textSecondary">
                    New Exit
                </Typography>
                <TextField
                    id="registerID"
                    name="registerID"
                    onChange={handleChange}
                    variant="outlined"
                    label="Book Name"
                    fullWidth
                    select
                    margin="normal"
                >
                    {displayExitBookIDs()}
                </TextField>
                <Button
                    type="submit"
                    disabled={!state.registerID}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {exitLoading ? <CircularProgress /> : "Register Exit"}
                </Button>
                {/*@ts-ignore*/}
                <StudentExitDetails registerExit={state.registerExit} />
            </form>
        </div>
    )
}

export default Register

export class StudentEntryDetails extends Component<{ registerEntry: RegisterEntry }> {
    displayStudentEntryDetails = () => {
        /*@ts-ignore */

        const { registerEntry } = this.props
        if (registerEntry) {
            return (
                <div>
                    <h2>{registerEntry.studentName}</h2>
                    <p>{registerEntry.rollNumber}</p>
                    <p>{registerEntry.book.name}</p>
                    <p>{moment(registerEntry.issuedDate)}</p>
                </div>
            )
        } else {
            return <div>No Book Selected ...</div>
        }
    }
    render() {
        return <div>{this.displayStudentEntryDetails()}</div>
    }
}

export class StudentExitDetails extends Component {
    displayStudentExitDetails = () => {
        /*@ts-ignore */

        const { registerExit } = this.props
        if (registerExit) {
            return (
                <div>
                    <h2>{registerExit.studentName}</h2>
                    <p>{registerExit.rollNumber}</p>
                    <p>{registerExit.book.name}</p>
                    <p>{registerExit.issuedDate}</p>
                    <p>{registerExit.returnedDate}</p>
                </div>
            )
        } else {
            return <div>No Book Selected ...</div>
        }
    }
    render() {
        return <div>{this.displayStudentExitDetails()}</div>
    }
}
