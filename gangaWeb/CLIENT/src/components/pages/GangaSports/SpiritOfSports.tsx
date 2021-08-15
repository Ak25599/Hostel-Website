import React, { Fragment, useState } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import iitmicon from "../../../utils/images/sports_images/iitmicon.jpg"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import MobileStepper from "@material-ui/core/MobileStepper"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import Activity from "../../../utils/images/sports_images/activity.jpeg"
import Balanced_Meal from "../../../utils/images/sports_images/balanced_meals.jpeg"
import Binge_Eating from "../../../utils/images/sports_images/binge_eating.jpeg"
import Blog from "../../../utils/images/sports_images/bllog.jpeg"
import Bored from "../../../utils/images/sports_images/bored.jpeg"
import Routine_Change from "../../../utils/images/sports_images/change_of_routine.jpeg"
import Fruits from "../../../utils/images/sports_images/fruits.jpeg"
import Ganga_Pool from "../../../utils/images/sports_images/ganga_jamuna_pool.jpeg"
import Magazine from "../../../utils/images/sports_images/ganga_magazine.jpeg"
import Urijita from "../../../utils/images/sports_images/urijita.jpeg"
import Wing_Wars from "../../../utils/images/sports_images/sports_wars.jpeg"
import Donate from "../../../utils/images/sports_images/sports_donate.jpeg"
import Photography_Contest from "../../../utils/images/sports_images/photography_contest.jpeg"
import Quarantine_Nutrition from "../../../utils/images/sports_images/quarantine_nutrition.jpeg"
import Mental_Health from "../../../utils/images/sports_images/mental_health.jpeg"
import Immunity from "../../../utils/images/sports_images/immunity.jpeg"
import Hydration from "../../../utils/images/sports_images/immunity.jpeg"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
const tutorialSteps = [
    {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: Urijita,
    },
    {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: Quarantine_Nutrition,
    },
    {
        label: "Bird",
        imgPath: Mental_Health,
    },
    {
        label: "Bali, Indonesia",
        imgPath: Immunity,
    },
    {
        label: "NeONBRAND Digital Marketing, Las Vegas, United States",
        imgPath: Hydration,
    },
    {
        label: "Goč, Serbia",
        imgPath: Fruits,
    },
    {
        label: "Goč, Serbia",
        imgPath: Routine_Change,
    },
    {
        label: "Goč, Serbia",
        imgPath: Balanced_Meal,
    },
    {
        label: "Goč, Serbia",
        imgPath: Activity,
    },
    {
        label: "Goč, Serbia",
        imgPath: Binge_Eating,
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        flexGrow: 1,
        margin: "auto",
        backgroundColor: "black",
    },
    header: {
        display: "flex",
        alignItems: "center",
        height: 30,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        width: "100%",
        height: 480,
        display: "block",
        maxWidth: 600,
        overflow: "hidden",
    },

    singleImg: {
        "&:hover": {
            boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.30)",
            transform: "scale(1.01)",
            transition: "0.3s all ease-in-out",
        },
    },

    posterContainer: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "1em",
        margin: "2em 0",
    },
    posterTitle: {
        fontSize: 28,
        display: "block",
        textAlign: "center",
        padding: "1em",
    },
    posterImgContainer: {
        display: "flex",
        justifyContent: "center",
    },
}))

const tablist = [
    { title: "Ganga Magazine & Rulebook" },
    { title: "Sports Collection Drive" },
    { title: "Quarantine Nutrition" },
    { title: "Stay Home, Stay Fit" },
    { title: "Photography Contest" },
]

function SpiritOfSports() {
    const classes = useStyles()
    const theme = useTheme()
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = tutorialSteps.length
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStepChange = (step) => {
        setActiveStep(step)
    }

    return (
        // <SportsNavContext.Consumer>
        // {(nav) => {
        // return (
        <Fragment>
            {/* // {tablist && tablist.length && nav({ tablist })} */}
            <Typography
                variant="h3"
                align="center"
                style={{
                    width: "70%",
                    padding: "0.2em",
                    textTransform: "uppercase",
                    backgroundColor: "#D48325",
                }}
            >
                Spirit of Sports
                {/* <img src={iitmicon} alt="iitmicon" className="iitmicon" /> */}
            </Typography>
            <div className={classes.posterContainer}>
                <div className="SOS" id={tablist[0].title}>
                    <strong className={classes.posterTitle}>{tablist[0].title}</strong>
                    <div className={classes.posterImgContainer}>
                        <img
                            src={Magazine}
                            alt="Magazine"
                            className={`${classes.img} ${classes.singleImg}`}
                        />
                    </div>
                </div>
                <div className="SOS" id={tablist[1].title}>
                    <strong className={classes.posterTitle}>{tablist[1].title}</strong>
                    <div className={classes.posterImgContainer}>
                        <img
                            src={Donate}
                            alt="Donate"
                            className={`${classes.img} ${classes.singleImg}`}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.posterContainer}>
                <div className="SOS" id={tablist[2].title} style={{ maxWidth: 540 }}>
                    <strong className={classes.posterTitle}>{tablist[2].title}</strong>
                    <div className={classes.root}>
                        <Paper square elevation={0} className={classes.header}>
                            <Typography>{tutorialSteps[activeStep].label}</Typography>
                        </Paper>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {tutorialSteps.map((step, index) => (
                                <div key={step.label}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <img
                                            className={classes.img}
                                            src={step.imgPath}
                                            alt={step.label}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            variant="dots"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === "rtl" ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                    {theme.direction === "rtl" ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className={classes.posterContainer}>
                <div className="SOS" id={tablist[3].title}>
                    <strong className={classes.posterTitle}>{tablist[3].title}</strong>
                    <div className={classes.posterImgContainer}>
                        <img
                            src={Bored}
                            alt="Bored"
                            className={`${classes.img} ${classes.singleImg}`}
                        />
                    </div>
                </div>
                <div className="SOS" id={tablist[4].title}>
                    <strong className={classes.posterTitle}>{tablist[4].title}</strong>
                    <div className={classes.posterImgContainer}>
                        <img
                            src={Photography_Contest}
                            alt="photography_contest"
                            className={`${classes.img} ${classes.singleImg}`}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
// </SportsNavContext.Consumer>
//     )
// }

export default SpiritOfSports
