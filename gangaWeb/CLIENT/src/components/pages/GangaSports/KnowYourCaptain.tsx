import React, { Fragment, useState } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
/*@ts-ignore */
import Sarath from "../../../utils/images/sports_images/sarath.png"
import Utkarsh from "../../../utils/images/sports_images/utkarsh.png"
import Vikash from "../../../utils/images/sports_images/vikash.jpeg"
import Yashwant from "../../../utils/images/sports_images/yashwant.jpg"
import Varun from "../../../utils/images/sports_images/varun.jpg"
import Sohail from "../../../utils/images/sports_images/sohail.jpg"
import Shreyash from "../../../utils/images/sports_images/shreyash.jpg"
/*@ts-ignore */
import Shreeniwas from "../../../utils/images/sports_images/shreeniwas.png"
import Roshan from "../../../utils/images/sports_images/roshan.jpg"
/*@ts-ignore */
import Ranjeev from "../../../utils/images/sports_images/ranjeev.png"
import Rajas from "../../../utils/images/sports_images/rajas.jpeg"
/*@ts-ignore */
import Nithyan from "../../../utils/images/sports_images/nithyan.png"
import Kaushik from "../../../utils/images/sports_images/kaushik.jpeg"
import John from "../../../utils/images/sports_images/john.jpeg"
/*@ts-ignore */
import Ishan from "../../../utils/images/sports_images/ishan.jpg"
import Gaurav from "../../../utils/images/sports_images/gaurav.jpeg"
import Naveen from "../../../utils/images/sports_images/naveen.jpg"
const useStyles = makeStyles((theme) => ({
    rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: 400,
        width: 30,
        position: "fixed",
        right: 0,
    },
    tabs: {
        borderLeft: `0.5px solid ${theme.palette.divider}`,
        backgroundColor: "grey",
    },
    tab: {
        height: 80,
    },
    root: {
        width: 300,
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: "grey",
        color: "white",
    },
    media: {
        height: 180,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
}))
function KnowYourCaptain() {
    const classes = useStyles()
    const [expanded, setExpanded] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ])
    const [value, setValue] = useState(0)
    const tablist = ["0div", "5div", "8div", "11div", "14div", "16div"]

    const handleChangeTab = (index) => {
        setValue(index)
    }

    const handleExpandClick = (index) =>
        setExpanded(expanded.map((item, itemIndex) => (itemIndex === index ? !item : item)))

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            "aria-controls": `vertical-tabpanel-${index}`,
        }
    }

    return (
        <Fragment>
            <div className={classes.rootTab}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {tablist.map((item, index) => {
                        return (
                            <a onClick={handleChangeTab.bind(this, index)} href={"#" + item}>
                                <Tab
                                    className={classes.tab}
                                    label={"scroll" + item}
                                    {...a11yProps(index)}
                                />
                            </a>
                        )
                    })}
                </Tabs>
            </div>
            <Typography className="title" variant="h3" align="center" color="textSecondary">
                Know Your Captains 2019-20
            </Typography>
            <Grid container direction="row">
                {captainsSection.map((captain, index) => {
                    const state = expanded[index]
                    const id = JSON.stringify(index)
                    return (
                        <Grid>
                            <div id={id + "div"}>
                                <Card className={classes.root}>
                                    <CardHeader title={captain.name} subheader="2019-20" />
                                    <CardMedia
                                        className={classes.media}
                                        image={captain.url}
                                        title={captain.name}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Get To Know Him Here...
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton
                                            value={captain.id} //Ok regarding the captain id come above, where are you
                                            onClick={handleExpandClick.bind(this, index)}
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: state,
                                            })}
                                            aria-expanded={state}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={state} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>{captain.description}</Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </div>
                            ;
                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    )
}

export default KnowYourCaptain

const captainsSection = [
    {
        name: "vikaSh - weightlifting",
        description:
            "Vikash is a two times weightlifting captain of Ganga and he was finally able to bring home gold this year. He is the only vegetarian weightlifter in Insti team. He is said to be an injury specialist, as he gets injured even in the most perfect of situations. If you need him for something, you will only find him in his room late at night",
        url: Vikash,
    },
    {
        name: "Rajas - Tennis",
        description:
            "The captain of the Ganga Tennis team, and also the only sophomore in the team. This Chem stud, along with Tennis also played Water Polo for the hostel. Has immense hostel feels, and did put his all for the win. Big fan of Federer, and tries to idolise his volleys. Crosscourt forehand being his most used weapon tries to use it to the best of his advantage.s",
        url: Rajas,
    },
    {
        name: "yashwant - athletics",
        description:
            "This aero sophomore just isn't a cyclist. He is the current athletics captain and also a member of the powerlifting, hockey, cycling and various teams. This fitness freak has next level feels for Ganga. He secured 6th this year and set to do more in the upcoming years.",
        url: Yashwant,
        id: 3,
    },
    {
        name: "varun - volleyball",
        description:
            "Peace max and the coolest guy of the team, who is never believed to put an effort for something except volleyball. Being the booster, his hands are one of the safest in the court. He is one of those guys who can play any position during the game without letting his team down. Rightly promoted as captain with his infi strategies and game plan. As a captain, he has put a lot of effort in improving the volleyball infrastructure in the hostel and was quite successful in increasing the popularity of volleyball inside hostel.",
        url: Varun,
        id: 4,
    },
    {
        name: "Sohail - powerlifting",
        description:
            "Always ready to help the team to boost Confidence.Flexible with practice timing so to keep eyes on everyone’s performance. Example of good leader. Not to mention his extra-ordinary performances in para-pwerlifting at inter-IIT sports meet.",
        url: Sohail,
        id: 5,
    },
    {
        name: "shreyash - cricket",
        description:
            "The captain of Ganga cricket team who has won so many hearts in InterIITKGP by his brilliant fielding efforts and has such a great batting potential. He won't give you a chance to take rest of laughing by making so many damn sexy back to back jokes. Even it won't end there, he'll show you some crazy dance steps from his great choreography skills. If you want someone, you can date him, boy or girl I'm sure you won't regret at all.",
        url: Shreyash,
        id: 6,
    },
    {
        name: "roshan - badminton",
        description:
            "Roshan is all rounder, who can draw, sing as well as play various sports. He is always ready to put fight for Ganga, let it be LitSoc or Schroeter.",
        url: Roshan,
        id: 7,
    },
    {
        name: "ishan - squash",
        description:
            "He is the captain of the Ganga squash team. Ishan has an impeccable track record while playing for Ganga and was unbeaten at Schroeter this year",
        url: Ishan,
        id: 8,
    },
    {
        name: "gaurav - aquatics",
        description:
            "This sophomore was the goalie of the institute water polo team, but plays in the outfield for Ganga. He's a Bangalore boy and also a part of Team Avishkar. He's known to take a lot of HS electives and stil thinks there is money in research.",
        url: Gaurav,
        id: 9,
    },
    {
        name: "john - football",
        description:
            "An Institute Football team player from his first year known for his composure on and off the field. One of the most talented players in recent years in the Football team. He might even fill into the best XI of players who knows him. He guided the Ganga team and brought the best of the players with his experience. His presence makes Ganga Football team one of the top contenders of Schroeter. One gem of a player and person loved by everyone. Have a chat with him if you can spot him having a Burger at Cafe Spark at midnight.",
        url: John,
        id: 10,
    },
    {
        name: "shreeniwas - TRIATHLON",
        description:
            "This ultra-sports enthu mechie is a part of the institute aquatics team and the pillar of the Ganga Water Polo Team. He is all about getting things done with passion, dedication and hardwork. This was very evident in the initiatives that he took as Ganga’s Sports Secretary. He is the in-house meme gawd and can make you laugh, but when he enters the pool, he wipes the smile off even the toughest of opponents. Don't go on his smiley face his triathlete stamina is evident of his dean's trophy expeditions. Inumerous achievements in dean's trophy to mention, in short Dean's trophy Gawd. His passion for Ganga is clearly evident from his contribution to Althletics, Aquatics, Hockey, Triathlon, Powerlifting, Cycling and much more teams.",
        url: Shreeniwas,
        id: 11,
    },
    {
        name: "utkarsh - hockey",
        description:
            "This guy is so popular in Mech girls, that each and everyone of them knows his room no. Pro-guitar player and backbone of Ganga Music club. You can find this guy composing some songs at Ganga Music Room. Lovingly known as 'Hawas' by his wingmates. This guy always put fight for Ganga, let it be Schroeter or be LitSoc.",
        url: Utkarsh,
        id: 12,
    },
    {
        name: "nitHyan - table tennis",
        description:
            "You have to take birth ten times to master all the sports in Insti, but for the Ganga Table Tennis Captain, he makes playing all these sports a cup of tea. From flawless cricketing shots to backhand flicks, Nithyan has everything in his range, and proudly leads the Ganga Table Tennis Team",
        url: Nithyan,
        id: 13,
    },
    {
        name: "kaushik - bridge",
        description:
            "One of the most stud guys of mech dept, this guy understands the game like no one else. Looking to flex his brain after returning from a sem ex in one of the topmost universities at Singapore, he's the one to beat. With 9...... CG he is a role model for juniors. ",
        url: Kaushik,
        id: 14,
    },
    {
        name: "ranjeev - waterpolo",
        description:
            "Meet the dynamic water polo captain who is also the goalkeeper of the team. He is a hockey player who has contributed endlessly for three years to Ganga's Schroeter Campaigns. He has insane feels for Ganga and refuses to don any color apart from the iconic red jersey.",
        url: Ranjeev,
        id: 15,
    },
    {
        name: "naveen - cycLing",
        description:
            "This guy can manage both acads as well as sports with his coding adventures. This non-core mechie is all set to thulp going on sem of 73 credits",
        url: Naveen,
        id: 16,
    },
    {
        name: "sarath - basketball",
        description: "",
        url: Sarath,
        id: 17,
    },
]
