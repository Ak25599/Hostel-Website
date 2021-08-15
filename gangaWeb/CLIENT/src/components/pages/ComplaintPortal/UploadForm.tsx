import React, { useMemo, useCallback, useState, useEffect, Fragment } from "react"
import { useDropzone } from "react-dropzone"

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import {
    useGetComplaintUploadUrlMutation,
    useSetComplaintDownloadUrlMutation,
} from "../../../generated"
import axios from "axios"
const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "rgb(207, 212, 219)",
    borderStyle: "dashed",
    color: "rgb(108, 121, 143)",
    backgroundColor: "white",
    fontSize: 18,
    fontWeight: "500",
    outline: "none",
    transition: "border .24s ease-in-out",
    padding: "20%",
}

const activeStyle = {
    borderColor: "#2196f3",
}

const acceptStyle = {
    borderColor: "#00e676",
}

const rejectStyle = {
    borderColor: "#ff1744",
}

export default ({ open, handleClose, id, name, setSuccess }) => {
    const [noDrag, setNoDrag] = useState(true)
    const handleSubmitAnyway = () => {
        setNoDrag(true)
        handleClose()
        setSuccess(true)
    
    }
    const handleSubmit = () => {
        setNoDrag(false)
    }
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length) {
            setFiles(acceptedFiles[0])
            getUploadUrl({
                variables: {
                    fileName: `${name + id}.jpg`,
                    complaintId: id,
                },
            })
        }
    }, [])
    // In case they want to submit anyway

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: ".jpg",
        onDrop: onDrop,
        multiple: false,
        noClick: noDrag,
    })
    const [files, setFiles] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadingError, setUploadingError] = useState(false)

    const [
        getUploadUrl,
        { data: uploadData, loading: uploadLoading, error: uploadError },
    ] = useGetComplaintUploadUrlMutation()

    const [setDownloadUrl, { data, loading, error }] = useSetComplaintDownloadUrlMutation()
    useEffect(() => {
        if (data) {
            console.log(data)
            setSuccess(true)
            handleClose()
        }
    }, [data])
    useEffect(() => {
        if (uploadData?.getComplaintUploadUrl) {
            setUploading(true)
            var options = {
                headers: {
                    "Content-Type": files.type,
                },
            }
            console.log(options)
            axios
                .put(uploadData.getComplaintUploadUrl.uploadUrl, files, options)
                .then((result) => {
                    setDownloadUrl({
                        variables: {
                            id,
                            url: uploadData.getComplaintUploadUrl.downloadUrl,
                        },
                    })
                    setUploading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setUploadingError(true)
                })
        }
    }, [uploadData])

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    )

    const disabled = !!(uploadData || uploadLoading || uploading)
    const Error = !!(uploadError || uploadingError)

    return (
        <div style={{ minWidth: "70vw" }}>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"sm"}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Upload Image for Reference</DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            width: "100%",
                            margin: "auto",
                            marginTop: "5%",
                        }}
                    >
                        {/*
                // @ts-ignore*/}
                        <div {...getRootProps({ style })}>
                            <input disabled={disabled} {...getInputProps()} />
                            {disabled && !error ? (
                                <Fragment>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CircularProgress />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {uploadLoading && (
                                                <p>Getting&nbsp;upload&nbsp;URL&nbsp;...</p>
                                            )}
                                            {uploading && <p>Uploading&nbsp;....</p>}
                                            {loading && <p>Updating&nbsp;...</p>}
                                        </Grid>

                                        {/* <Row>
                            <Column style={{ color: "#084786" }}>
                                
                            </Column>
                            <SizedBox width={15} />
                            <Column>

                            </Column>
                        </Row> */}
                                    </Grid>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <p>Drag and drop your file here, or</p>
                                    <Button onClick={handleSubmit} variant="contained" style={{ marginTop: "14px" }}>
                                        Upload a file
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={handleSubmitAnyway}
                                        style={{ marginTop: "14px" }}
                                    >
                                        Submit without File
                                    </Button>
                                </Fragment>
                            )}
                            {Error && (
                                <Typography variant="body2">
                                    <p>Something went wrong, please try again.</p>
                                </Typography>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
