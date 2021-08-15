import React, { Fragment, Component } from "react"
import Typography from "@material-ui/core/Typography"
/*@ts-ignore */
import Cycling from "../../../utils/images/sports_images/cycling_win.jpg"
import Triathlon from "../../../utils/images/sports_images/triathlon_win.png"
import Football from "../../../utils/images/sports_images/football_6a_wi.jpg"
import WeightLifting from "../../../utils/images/sports_images/vikas_weight.png"
import { makeStyles, Card, CardContent, CardMedia } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    achievementsContainer: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "1.5em",
        marginTop: "1.5em",
        gap: "1em",
    },

    card: {
        maxWidth: 360,
        position: "relative",
        backgroundColor: "grey",
        borderBottom: `10px solid transparent`,
        borderImage: `linear-gradient(to right, ${theme.palette.secondary.light} , ${theme.palette.secondary.main})`,
        transition: "0.5s ease-in-out all",
        borderImageSlice: 1,
        borderRadius: 0,

        "&:hover": {
            transform: "translateY(-10px)",
        },
    },

    imgContainer: {
        width: "100%",
        height: 240,
        overflow: "hidden",
    },

    positionText: {
        position: "absolute",
        top: 180,
        right: 0,
        padding: "12px 16px",
        fontSize: 20,
        fontStyle: "italic",
        color: "white",
        fontWeight: 600,
    },
    img: {
        width: "100%",
        height: "auto",
    },

    title: {
        fontSize: 20,
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: "0.5em",
    },

    description: {
        fontSize: 15,
        color: "rgba(255,255,255,0.7)",
    },

    gold: {
        backgroundColor: "rgba(255, 217, 0, 0.65)",
        border: "3px solid rgb(255, 217, 0)",
    },
    silver: {
        backgroundColor: "rgba(192, 192, 192, 0.65)",
        border: "3px solid rgb(192, 192, 192)",
    },
    bronze: {
        backgroundColor: "rgba(165, 42, 42, 0.65)",
        border: "3px solid rgb(165, 42, 42)",
    },
}))

const data = [
    {
        src: Football,
        desc: "",
        position: "BRONZE",
        title: "6 a side Football",
    },
    {
        src: Cycling,
        desc:
            "Second win for Ganga in a row, thulping in dean's trophy cycling securing 1st overall having 5 positions in the top 10. First individual position was secured by the well expected and our very own sports sec Shreeniwas , followed by the sixth position by Yashwant, Seventh position by Rohan, Eighth position N R Dyava Ninth position Sarath, twelth position by Midhun, Eighteenth by newbee deepan Atharv Mashalkar- Twentieth position, Vinay Balla - twenty second position  ",
        position: "GOLD",
        title: "Cycling",
    },
    {
        src: Triathlon,
        desc:
            "Ganga placed in the Deans Trophy Triathlon after 5 long years and to top it off, we finished second overall. Triathlon captain shreenivas placed second. Sophomores performed beyond expectations with Gurav finishing 9th, Aditya finishing 19th and hari sanlar finishing 2nd",
        position: "SILVER",
        title: "Triathlon",
    },
    {
        src: WeightLifting,
        desc:
            "We got gold back. Vikash brought gold home in under 69 categor. He lifted total of 163 kg ( snatch 73 kg asd C&J 90kg).",
        position: "GOLD",
        title: "Weightlifting",
    },
]

const Achievements = () => {
    const classes = useStyles()

    const tablist = ["Dean's Trophy", "Schroeter", "Intra-Hostel"]
    return (
        // <SportsNavContext.Consumer>
        //     {(nav) => {
        // return (
        <Fragment>
            {/*@ts-ignore */}
            {/* <Fragment>{!!tablist && nav({ tablist })}</Fragment> */}
            <Typography
                id="achievements"
                className="title"
                variant="h3"
                align="center"
                color="textSecondary"
            >
                Achievements 2019-20
            </Typography>
            <div className={classes.achievementsContainer}>
                {data.map((a) => (
                    <Card className={classes.card}>
                        <CardMedia className={classes.imgContainer}>
                            <img className={classes.img} src={a.src} />
                        </CardMedia>
                        <Typography
                            className={`${classes.positionText} ${
                                a.position.toLowerCase() == "gold"
                                    ? classes.gold
                                    : a.position.toLowerCase() == "silver"
                                    ? classes.silver
                                    : classes.bronze
                            }`}
                        >
                            {a.position}
                        </Typography>
                        <CardContent style={{ padding: "1em" }}>
                            <Typography className={classes.title}>{a.title}</Typography>
                            <Typography className={classes.description}>{a.desc}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Fragment>
    )
}
// </SportsNavContext.Consumer>
//     )
// }
export default Achievements
