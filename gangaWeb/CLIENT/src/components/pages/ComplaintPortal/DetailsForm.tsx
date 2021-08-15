import React, { useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import CircularProgress from "@material-ui/core/CircularProgress"
import MenuItem from "@material-ui/core/MenuItem"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        form: {
            backgroundColor: "white",
            padding: theme.spacing(4, 4, 8),
            minHeight: 440,
            boxShadow: `2px 2px 2px 2px grey`,
        },

    })
)
export default ({ id,smail, complaint, description, floor }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
             <form noValidate className={classes.form}>
                        <Typography component="h1" variant="h6" color="textSecondary">
                            DETAILS OF COMPLAINT                        </Typography>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={2} /> */}
                            <Grid item xs={12}>
                                <Grid container justify="space-between">
                                    
                                        <TextField
                                            variant="filled"
                                            disabled
                                            label={"COMPLAINT: "+complaint}
                                        />
                                        <TextField
                                            variant="filled"
                                            disabled
                                            margin="normal"
                                            label={"FLOOR: "+floor}
                                        />
                                </Grid>
                                <TextField
                                    variant="filled"
                                    disabled
                                    label={"EMAIL ID:"+smail}
                                    fullWidth
                                    margin="normal"
                                >
                                </TextField>
                                <TextField
                                    variant="filled"
                                    margin="normal"
                                    disabled
                                    fullWidth
                                    label={"DESCRIPTION: "+description}
                                    multiline
                                    rows="4"
                                />
                            </Grid>
                        </Grid>
                    </form>

        </div>
    )
}
