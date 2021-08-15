import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
import EditIcon from "@material-ui/icons/Assignment"
import MediaIcon from "@material-ui/icons/MovieCreation"
import BoardGamesIcon from "@material-ui/icons/VideogameAsset"
import EventIcon from "@material-ui/icons/Event"
import FinanceIcon from "@material-ui/icons/MonetizationOn"
import Avatar from "@material-ui/core/Avatar"

import Amey from "../../../utils/images/sports_images/amey.jpg"
import Deepan from "../../../utils/images/sports_images/deepan.jpg"
import Gaurav from "../../../utils/images/sports_images/gaurav.jpeg"
import Harsh from "../../../utils/images/sports_images/harsh.jpg"
import Kranthi from "../../../utils/images/sports_images/kranthi.jpg"
import Rajas from "../../../utils/images/sports_images/rajas.jpeg"
import Vikas from "../../../utils/images/sports_images/vikas_gen.jpg"
import Vinay from "../../../utils/images/sports_images/vinay.jpg"
import Yashwant from "../../../utils/images/sports_images/yashwant_content.png"
import RamCharan from "../../../utils/images/sports_images/ramcharan.jpg"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    large: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        margin: "1.5em auto",
    },
    pCardContainer: {
        display: "flex",
        flexWrap: "wrap",
        padding: "1.5em",
        marginTop: "1.5em",
        gap: "0.5em",
        justifyContent: "center",
    },

    pCard: {
        width: 320,
        marginBottom: "1.5em",

        backgroundColor: "#48494b",
        "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "0px 0px 15px 4px rgba(250, 128, 114, 0.7)",
        },
        border: "none",
        boxShadow: "none",
    },
    pContent: {
        margin: "0 auto",
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        padding: "0.5em 1em",
        alignContent: "center",
    },
    pCardImg: {
        width: 64,
        height: 64,
        margin: "1.5em auto 0.5em auto",
    },
}))


const data = [
    {
        src: Yashwant,
        name: "Yashwant",
        desc:
            "A multi-sports person, who can participate in any sport offered with the same josh as for his signature sport. An aspirant who works hard as to miss meals a day for backing up and cheering teams, though he isn't in the squad. The definition of Enthu !!",
        id: "Events",
    },
    {
        src: Rajas,
        name: "Rajas",
        desc:
            "A composed guy in this group. A good tennis player. He has been offering a helping hand till the end, though he is an aspirant for the position of hostel legislator.",
    },
    {
        src: Deepan,
        name: "Deepan",
        desc:
            'This guy is as calm as flowing river, but when it comes to Ganga, he is ready to put all he got. Extremum of humbleness and liked by everyone(i.e. someone liked him eight years ago!!). He juggles his time from playing sports (6 sports in a schroeter!!) to managing his MEA work. In the end, we will like to say, "This type beast is very rare to find"',
        id: "Content and Finance Head",
    },
    {
        src: Vinay,
        name: "Vinay",
        desc:
            'This guy is as calm as flowing river, but when it comes to Ganga, he is ready to put all he got. Extremum of humbleness and liked by everyone(i.e. someone liked him eight years ago!!). He juggles his time from playing sports (6 sports in a schroeter!!) to managing his MEA work. In the end, we will like to say, "This type beast is very rare to find"',
    },
    {
        src: Amey,
        name: "Amey",
        desc:
            'This Legend is The Legend. An "over-enthusiastic" person. You know the best way to fight and grow in your life is to talk to yourself?!. Well here is the person, who is seen talking to himself at times. A multi-position- aspiring kid, sorry "critic".',
    },
    {
        src: Harsh,
        name: "Harsh",
        desc:
            "This guy is really hard-working, he has arranged few events even with fever !. Unfortunately we missed him during even semester due to his sem-exchange. Good Football player.",
    },
    {
        src: Amey,
        name: "Amey",
        desc:
            'This Legend is The Legend. An "over-enthusiastic" person. You know the best way to fight and grow in your life is to talk to yourself?!. Well here is the person, who is seen talking to himself at times. A multi-position- aspiring kid, sorry "critic".',
    },
    {
        src: Kranthi,
        name: "Kranthi",
        desc:
            "Being Deepan's best buddy (At-least that's what he thinks) he is also co-core of MEA Finance team along with Deepan. He was the Ganga-Board Games manager. His Sherlock sense helped us finding missing CATAN cards. Once he promises something he finishes it (Contact him during elections?). PoR gawd, Miracle of Nature, Kranthi Garu are some of his nicknames. Don't mess with him he is deadly.",
        id: "Board Games",
    },
    {
        src: Vikas,
        name: "Vikas",
        desc: "",
        id: "Editors-In-Chief",
    },
    {
        src: Gaurav,
        name: "Gaurav",
        desc:
            'This Legend is The Legend. An "over-enthusiastic" person. You know the best way to fight and grow in your life is to talk to yourself?!. Well here is the person, who is seen talking to himself at times. A multi-position- aspiring kid, sorry "critic".',
    },
    {
        src: RamCharan,
        name: "RamCharan",
        desc:
            'This is a person who genuinely doesn\'t belong to this group(no offense please). A type who can be described as "careless to the core, but still things happen to his likings". This face is always seen smiling throughout, except when forced to wake up. Can you live without JC??',
        id: "Media",
    },
]

function AboutUs() {
    const classes = useStyles()
    return (
        <Fragment>
            <Typography className="title" variant="h3" align="center" color="textSecondary">
                About Us
            </Typography>
          
            <div className={classes.pCardContainer}>
                {data.map((p) => (
                    <Card className={classes.pCard} id={p.id && p.id}>
                        <Avatar alt={p.name} src={p.src} className={`${classes.large}`} />
                        <Typography
                            variant="h5"
                            align="center"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                            {p.name}
                        </Typography>
                        <CardContent className={classes.pContent}>{p.desc}</CardContent>
                    </Card>
                ))}
            </div>
        </Fragment>
    )
}

export default AboutUs
