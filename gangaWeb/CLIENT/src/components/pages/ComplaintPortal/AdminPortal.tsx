import React, { useState, useEffect, useContext } from "react"
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import CircularProgress from "@material-ui/core/CircularProgress"
import { DetailsForm } from "."

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import { AuthUserObject } from "../../../interfaces"
import { withAuthorization } from "../../../contexts/session"
import * as ROUTES from "../../../constants/routes"
import {
    UserRole,
    ComplaintStatus,
    useGetComplaintsQuery,
    refetchGetComplaintsQuery,
    useResolveComplaintMutation,
} from "../../../generated"
import { MenuItem, Modal, Backdrop, Fade } from "@material-ui/core"
import { Edit } from "@material-ui/icons"
import {useLocation, useHistory } from "react-router-dom"
import AuthUserContext from "../../../contexts/session"

const condition = (authUser: AuthUserObject["authUser"] | null) => !!authUser.id

export default withAuthorization(
    condition,
    ROUTES.LOGIN
)(() => {
    const { authUser, setAuthUser } = useContext(AuthUserContext)
    const { push } = useHistory()
    const { pathname } = useLocation()

    const classes = useStyles()
    const [status, setStatus] = useState(ComplaintStatus.Pending)
    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.value == ComplaintStatus.Inprogress) {
            setStatus(ComplaintStatus.Inprogress)
        }

        if (e.target.value == ComplaintStatus.Pending) {
            setStatus(ComplaintStatus.Pending)
        }

        if (e.target.value == ComplaintStatus.Resolved) {
            setStatus(ComplaintStatus.Resolved)
        }
    }
    return (
        <Grid container>
            <Grid container justify="center">
                <Typography component="h1" variant="h4">
                    Admin Portal
                    {authUser?.id && authUser?.role == UserRole.Admin && <Button onClick={()=>{localStorage.clear()
                            setAuthUser(null)
                            window.location.reload()
                     }} > Sign Out  </Button>}        


                </Typography>
            </Grid>
            <Grid container xs={11} justify="flex-end">
                <FormControl>
                    <InputLabel
                        htmlFor="complaintstatus"
                        id="status-label"
                        className={classes.formLabel}
                    >
                        COMPLAINT STATUS
                    </InputLabel>
                    <Select
                        value={status}
                        labelId="status-label"
                        labelWidth={256}
                        onChange={handleChange}
                        className={classes.select}
                        autoFocus
                        inputProps={{
                            name: "status",
                            id: "complaintstatus",
                        }}
                    >
                        <MenuItem value={ComplaintStatus.Pending}>Pending</MenuItem>
                        <MenuItem value={ComplaintStatus.Inprogress}>In Progress</MenuItem>
                        <MenuItem value={ComplaintStatus.Resolved}>Resolved</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <ViewComplaints type={status} />
        </Grid>
    )
})

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

function createData(id, smail, complaint, floor, url, status, complaintDate) {
    return { id, smail, complaint, floor, url, status, complaintDate }
}

const useStyles = makeStyles((theme) => ({
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
}))

export function ViewComplaints({ type }) {
    const classes = useStyles()
    const [rows, setRows] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data, loading, error } = useGetComplaintsQuery({
        variables: {
            type,
            offset: 0,
        },
        nextFetchPolicy: "cache-and-network",
    })

    useEffect(() => {
        setRows([])
        refetchGetComplaintsQuery({ offset: 0, type })
    }, [type])

    useEffect(() => {
        if (error) console.log("error", error)
    }, [error])

    useEffect(() => {
        if (!!data) {
            console.log("Called here")
            console.log("data", data)
            data.getComplaints?.map((item) => {
                //               const timestamp = JSON.parse(item.submittedOn)
                //               const date = new Date(timestamp)
                //               const time = date.toString()
                //console.log(item.status)

                setRows((prevState) => [
                    ...prevState,
                    createData(
                        item.id,
                        item.smail,
                        item.complaint,
                        item.floor,
                        item.url,
                        item.complaintStatus,
                        item.complaintDate
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
                        <StyledTableCell>SMAIL</StyledTableCell>
                        <StyledTableCell align="right">COMPLAINT</StyledTableCell>
                        <StyledTableCell align="right">FLOOR</StyledTableCell>
                        <StyledTableCell align="right">STATUS</StyledTableCell>
                        <StyledTableCell align="right">COMPLAINT DATE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.smail}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.complaint}</StyledTableCell>
                            <StyledTableCell align="right">{row.floor}</StyledTableCell>
                            <StyledTableCell align="right">
                                {/* <Link href={row.url}>{row.url}</Link> */}
                                <Button onClick={() => setIsModalOpen(true)}>
                                    {row.status}
                                    <Edit style={{ marginLeft: 5, height: 20, width: 20 }} />
                                </Button>{" "}
                                <UpdateStatusModal
                                    id={row.id}
                                    status={row.status}
                                    isOpen={isModalOpen}
                                    setIsOpen={setIsModalOpen}
                                    setRows={setRows}
                                    type={type}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.complaintDate}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const UpdateStatusModal = ({ id, status, isOpen, setIsOpen, setRows, type }) => {
    const classes = useStyles()
    const [newStatus, setNewStatus] = useState(status)
    const [
        resolveComplaint,
        { loading: resolveComplaintLoading, error: resolveComplaintError },
    ] = useResolveComplaintMutation()

    const handleChange = (e) => {
        setNewStatus(e.target.value)
    }

    const handleClose = () => {
        setIsOpen(false)
        setNewStatus(status)
    }

    const handleSubmit = () => {
        try {
            resolveComplaint({
                variables: {
                    id,
                    status: newStatus,
                },
            }).then(() => {
                if (!resolveComplaintLoading) {
                    setIsOpen(false)
                    setRows([])
                    refetchGetComplaintsQuery({
                        type,
                        offset: 0,
                    })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            className={classes.modal}
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.modalContent}>
                    <h2 id="transition-modal-title">Update complaint status</h2>
                    <Select
                        value={newStatus}
                        onChange={handleChange}
                        style={{ width: "80%" }}
                        autoFocus
                        inputProps={{
                            name: "newstatus",
                            id: "newstatus",
                        }}
                    >
                        <MenuItem value={ComplaintStatus.Pending}>Pending</MenuItem>
                        <MenuItem value={ComplaintStatus.Inprogress}>In Progress</MenuItem>
                        <MenuItem value={ComplaintStatus.Resolved}>Resolved</MenuItem>
                    </Select>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        {resolveComplaintLoading ? <CircularProgress /> : "Update"}
                    </Button>
                </div>
            </Fade>
        </Modal>
    )
}
