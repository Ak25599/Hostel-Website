import React, { Fragment } from "react"
import {
    Card,
    CardMedia,
    makeStyles,
    Link,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
} from "@material-ui/core"
import { CallMade } from "@material-ui/icons"
import data from "./coursesData"

const useStyles = makeStyles((theme) => ({
    courseContainer: {
        display: "flex",
        backgroundColor: "black",
        padding: "1.5em 0",
        justifyContent: "center",
        flexWrap: "wrap",
    },

    courseCard: {
        width: 280,
        backgroundColor: "#48494b",
        boxShadow: "5px 5px 5px 5px #48494b60",
        marginRight: "1em",
        marginBottom: "1.5em",
    },
    courseContent: {
        margin: "0 auto",
        color: "white",
        textAlign: "center",
        padding: "0.5em 1em",
    },
    courseCardImg: {
        width: 64,
        height: 64,
        margin: "1.5em auto 0.5em auto",
    },
    button: {
        textAlign: "center",
        padding: "0.5em",
    },
    blue: {
        color: "skyblue",
    },
}))

export default function Courses() {
    const classes = useStyles()
    return (
        <div className={classes.courseContainer}>
            <CourseCard />
        </div>
    )
}

const CourseCard = () => {
    const classes = useStyles()
    return (
        <Fragment>
            {data.map((course) => (
                <Card className={classes.courseCard}>
                    <CardMedia
                        image={course.icon}
                        title="Web DEv"
                        className={classes.courseCardImg}
                    />
                    <CardContent className={classes.courseContent}>
                        <Typography
                            variant="h5"
                            component="h5"
                            style={{ color: "black", fontWeight: 600, fontSize: 18 }}
                        >
                            {course.title}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.courseContent} style={{ minHeight: 150 }}>
                        <Typography component="p" style={{ fontSize: 14 }}>
                            {course.content}
                        </Typography>
                    </CardContent>
                    {/* <div className={classes.button}>
                <a
                    href=""
                    style={{
                        color: "skyblue",
                    }}
                >
                    Learn here
                </a>
            </div> */}
                    <CardActions style={{ display: "flex", justifyContent: " center" }}>
                        <Button size="small" className={classes.blue}>
                            <a href={course.link}>Learn here</a>
                            <CallMade style={{ marginLeft: 5, height: 20, width: 20 }} />
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Fragment>
    )
}
