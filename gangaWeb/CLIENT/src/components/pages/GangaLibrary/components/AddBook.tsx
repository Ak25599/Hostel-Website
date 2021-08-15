 //@ts-nocheck
import React, { useState, Component, useEffect, useContext, ChangeEvent } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import moment from "moment"
import { useGetAuthorsQuery, refetchGetAuthorsQuery,refetchGetBooksQuery, UserRole } from "../../../../generated"

import { useAddBookMutation, useCreateAuthorMutation } from "../../../../generated"
import Register from "./Register"
import Navbar from "./Navbar"

//For authentication of LitSec

import {useLocation, useHistory } from "react-router-dom"
import { AuthUserObject } from "../../../../interfaces"
import { withAuthorization } from "../../../../contexts/session"
import AuthUserContext from "../../../../contexts/session"
import * as ROUTES from "../../../../constants/routes"
import {
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core"
import { withStyles} from "@material-ui/core/styles"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import {
    useGetEntriesQuery,
    refetchGetEntriesQuery,
} from "../../../../generated"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
        minWidth: 700,
    },
    select: {
        minWidth: 128,
        margin: theme.spacing(4, 0, 2),
    },
    formLabel: {
        color: "#000",
        width: 256,
        "&.Mui-focused": {
            color: "#000",
        },
    },
    modal: {
        width: 340,
        height: 200,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
    },
    modalContent: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        outline: "none",
        padding: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0),
    },
        head: {
            color: "black !important",
        },
        form: {
            backgroundColor: "white",
            padding: theme.spacing(4, 4, 2),
            height: "100%",
            boxShadow: `2px 2px 2px 2px grey`,
        },
        
    })
)

const condition = (authUser: AuthUserObject["authUser"] | null) =>
    !!authUser.id && authUser.role == UserRole.Litsec

export default withAuthorization(
    condition,
    ROUTES.GANGALIBRARY
)(() => {
    const classes = useStyles()
    const { authUser, setAuthUser } = useContext(AuthUserContext)
    const { push } = useHistory()
    const { pathname } = useLocation()

    
    const { data: authorsData, loading: authorsLoading, error: authorsError } = useGetAuthorsQuery()
    const [addBook, { data: addData, loading: addLoading, error: addError }] = useAddBookMutation()
    const [addAuthor, { data: addAuthorData, loading: addAuthorLoading, error: addAuthorError }] = useCreateAuthorMutation()
    
    const [state, setState] = useState({
        name: "",
        genre: "",
        language: "",
        year: "",
        publisher: "",
        isbn: "",
        bookId: "",
        authorId: "",
        authorName:"",
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkAllFields = () => {
        const { name, genre, language, year, publisher, isbn, bookId, authorId } = state
        return !name || !genre || !language || !year || !publisher || !isbn || !bookId || !authorId
    }

    const displayAuthors = () => {
        if (authorsLoading) {
            return (
                <MenuItem disabled>
                    <CircularProgress />
                </MenuItem>
            )
        } else {
            var Data = authorsData.getAuthors
            console.log(Data)
            return Data.map((author) => {
                return (
                    <MenuItem key={author.id} value={author.id}>
                        {author.name}
                    </MenuItem>
                )
            })
        }
    }

    const submitForm = (e: any) => {
        e.preventDefault()
        addBook({
            variables: {
                name: state.name,
                genre: state.genre,
                language: state.language,
                year: state.year,
                publisher: state.publisher,
                isbn: state.isbn,
                bookId: state.bookId,
                authorId: state.authorId,
            },
            refetchQueries: [
                refetchGetBooksQuery({
                    type: "ALL",
                }),
            ],
        })
    }
    const submitAuthorForm = (e: any) => {
        e.preventDefault()
        addAuthor({
            variables: {
                name: state.authorName,
            },
            refetchQueries: [
                refetchGetAuthorsQuery(),
            ],
        })
    }

    return !condition ? (
        <CircularProgress />
    ) : (
        <div className="main" style={{ width: "100%" }}>
            <h1 className={classes.head}>Ganga Library</h1>
            <Navbar/>
            <Register />
            <form noValidate id="add-book" onSubmit={submitForm} className={classes.form}>
                <Typography component="h1" variant="h6" color="textSecondary">
                    Add new book

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
                                    id="name"
                                    label="Book Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={state.name}
                                    type="text"
                                    style={{ marginRight: 8 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    id="genre"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Genre"
                                    name="genre"
                                    onChange={handleChange}
                                    value={state.genre}
                                    type="text"
                                />
                            </Grid>
                            <TextField
                                id="language"
                                name="language"
                                onChange={handleChange}
                                variant="outlined"
                                label="Language"
                                fullWidth
                                select
                                margin="normal"
                            >
                                <MenuItem value="English">English</MenuItem>
                            </TextField>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    id="year"
                                    margin="normal"
                                    required
                                    label="Year"
                                    name="year"
                                    onChange={handleChange}
                                    value={state.year}
                                    type="text"
                                    style={{ marginRight: 8 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    id="publisher"
                                    margin="normal"
                                    required
                                    label="Publisher"
                                    name="publisher"
                                    onChange={handleChange}
                                    value={state.publisher}
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    id="isbn"
                                    margin="normal"
                                    required
                                    label="Isbn"
                                    name="isbn"
                                    onChange={handleChange}
                                    value={state.isbn}
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    id="bookId"
                                    margin="normal"
                                    required
                                    label="Book ID"
                                    name="bookId"
                                    onChange={handleChange}
                                    value={state.bookId}
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="authorId"
                                    name="authorId"
                                    onChange={handleChange}
                                    variant="outlined"
                                    label="Author"
                                    fullWidth
                                    select
                                    margin="normal"
                                >
                                    {displayAuthors()}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            disabled={checkAllFields()}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {addLoading ? <CircularProgress /> : "Add Book"}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <form noValidate id="add-author" onSubmit={submitAuthorForm} className={classes.form}>
                <Typography component="h1" variant="h6" color="textSecondary">
                    Add new Author
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
                                    id="authorName"
                                    label="Author Name"
                                    name="authorName"
                                    onChange={handleChange}
                                    value={state.authorName}
                                    type="text"
                                    style={{ marginRight: 8 }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            disabled={!state.authorName}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {addAuthorLoading ? <CircularProgress /> : "Add Author"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ViewEntries />

        </div>
    )
})

///////////////////////////////////////////////////////

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

function createData(studentName, returnStatus, book, bookid,issuedDate,returnedDate) {
    return { studentName, returnStatus, book, bookid,issuedDate,returnedDate}
}


export function ViewEntries() {

    const classes = useStyles()
    const [rows, setRows] = useState([])
   
    const { data, loading, error } = useGetEntriesQuery({ variables: {
        offset: 0 ,
    },
    nextFetchPolicy: "cache-and-network",})


    useEffect(() => {
        if (error) console.log("error", error)
    }, [error])

    useEffect(() => {
        if (!!data) {
            data.getEntries?.map((item) => {
                setRows((prevState) => [
                    ...prevState,
                    createData(
                        item.studentName,
                        item.returnStatus,
                        item.book.name,
                        item.book.bookid,
                        item.issuedDate,
                        item.returnedDate
                    ),
                ])
            })
        }
        //  createData
    }, [data])
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">STUDENT NAME</StyledTableCell>
                        <StyledTableCell align="right">RETURN STATUS</StyledTableCell>
                        <StyledTableCell align="right">BOOK</StyledTableCell>
                        <StyledTableCell align="right">BOOK ID</StyledTableCell>
                        <StyledTableCell align="right">ISSUED DATE</StyledTableCell>
                        <StyledTableCell align="right">RETURNED DATE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.studentName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.returnStatus}</StyledTableCell>
                            <StyledTableCell align="right">{row.book}</StyledTableCell>
                            <StyledTableCell align="right">{row.bookid}</StyledTableCell>
                            <StyledTableCell align="right">{moment.unix(row.issuedDate/1000).format('dddd, MMMM Do, YYYY')}</StyledTableCell>
                            <StyledTableCell align="right">{moment.unix(row.returnedDate/1000).format('dddd, MMMM Do, YYYY')}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}



