import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import HomeIcon from "@material-ui/icons/Home"
import Gym from "../../../utils/images/sports_images/ganga_gym.png"
import PoolTable from "../../../utils/images/sports_images/ganga_pool_table.png"
import Carrom from "../../../utils/images/sports_images/ganga_carrom.png"
import Foosball from "../../../utils/images/sports_images/ganga_foosball.png"
import { CardMedia, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    card: {
        display: "flex",
        margin: "2em 0",
        backgroundColor: "rgba(128,128,128,0.4)",
    },

    right: {
        flexDirection: "row-reverse",
    },

    imgContainer: {
        fontSize: 0,
        width: "30%",

        "& > img": {
            width: "100%",
            minWidth: 360,
            maxWidth: 420,
            height: "auto",
        },
    },

    textContainer: {
        width: "70%",
        padding: "0 4em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        "& > *": {
            lineHeight: "2em",
        },
    },

    title: {
        fontSize: 32,
    },

    content: {
        color: "rgba(255,255,255,0.7)",
    },
})

const FacilitiesAndInfrastructure = () => {
    const classes = useStyles()

    const tablist = []
    
    return (
        // <SportsNavContext.Consumer>
        //     {(nav) => {
        //         return (
        <Fragment>
            {/* {tablist && tablist.length && nav({ tablist })} */}
            <Typography className="title" variant="h3" align="center" color="textSecondary">
                FACILITIES AND INFRASTRUCTURE
            </Typography>
            <div className={classes.card}>
                <div className={classes.imgContainer}>
                    <img src={Gym} />
                    <img src={PoolTable} />
                </div>
                <div className={classes.textContainer}>
                    <Typography className={classes.title}>Gym and Pool Table room</Typography>
                    <Typography className={classes.content}>
                        Our gym is equipped with various equipments starting from bench press to
                        punching bag. Various basic equipments were added this year. All your
                        routine exercise requirements can be fulfilled. Hope to see aspiring secys
                        to add on new equipments. Pool table is standard sized one.
                    </Typography>
                </div>
            </div>
            <div className={`${classes.card} ${classes.right}`}>
                <div className={classes.imgContainer}>
                    <img src={Carrom} />
                    <img src={Foosball} />
                </div>
                <div className={classes.textContainer}>
                    <Typography className={classes.title}>TT and Foosball Table Room</Typography>
                    <Typography className={classes.content}>
                        All the sports room were revamped this year. You can pass your leisure time
                        here. We are equipped with TT table, carrom board, darts and Foosball table.
                        Feeling bored? give it a try.
                    </Typography>
                </div>
            </div>
        </Fragment>
    )
}
//         </SportsNavContext.Consumer>
//     )
// }

export default FacilitiesAndInfrastructure
