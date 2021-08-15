import React, { Fragment } from "react"
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core"
import DoubleQuotes from "../../../utils/images/TechSoc/double_quote.png"

const useStyles = makeStyles((theme) => ({
    storiesContainer: {
        backgroundColor: "black",
        padding: "1.5em",
    },

    heading: {
        fontSize: 36,
        fontWeight: 600,
        textAlign: "center",
        marginBottom: "1em",
    },

    slidesContainer: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    slide: {
        backgroundColor: "#48494b",
        boxShadow: "5px 5px 5px 5px #48494b95",
        maxWidth: 540,
        color: "white",
        margin: "0 1em 1em 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    story: {
        padding: "1.5em",
        maxHeight: 300,
        overflowY: "scroll",
    },

    student: {
        padding: "1.5em",
        backgroundColor: theme.palette.secondary.main,
        position: "relative",
    },
    doubleQuote: {
        position: "absolute",
        top: -30,
        right: 35,
        backgroundColor: "#48494b",
        boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.4)",
        borderRadius: "50%",
        padding: "1em",
    },
}))

export default function Stories() {
    const classes = useStyles()
    return (
        <div className={classes.storiesContainer}>
            <Typography variant="h2" component="h2" className={classes.heading}>
                TechSoc Stories
            </Typography>
            <Slide />
        </div>
    )
}

const Slide = () => {
    const classes = useStyles()
    return (
        <div className={classes.slidesContainer}>
            {slides.map((slide) => (
                <Card className={classes.slide}>
                    <CardContent className={classes.story}>
                        <Typography component="p" style={{ fontSize: 15, fontStyle: "italic" }}>
                            {slide.story}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.student}>
                        <Typography>- {slide.student},</Typography>
                        <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                            {slide.event}
                        </Typography>
                        <div className={classes.doubleQuote}>
                            <img src={DoubleQuotes} width={32} height={32} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

const slides = [
    {
        student: "Sharique",
        event: "TAS 2017-18",
        story:
            "My journey through techsoc while I was TAS was pretty much unusual. Most of the events were either cancelled or very poorly management (dates often got postponed) as there was a dilemma going on to scrap techsoc. During my term I guess only 2-3 events were conducted. The best memory I had about techsoc is being placed 3rd in techsoc among all the hostels during my tenure as TAS. It was pretty much great since a lot of Gangasters were present when we were awarded the 2nd runner up trophy and I guess during my whole 4 years of techsoc presence, it was the first time we were placed in the top 3. At the end, I would just say, being a TAS and participating in Techsoc really helped me to try and learn new stuffs. It gave me new opportunities, new path to explore and hardly consumed any time. Hence, I would suggest every Gangasters to atleast explore these events and try out new things. You never know what is going to come next",
    },
    {
        student: "Ram Kiran",
        event: "TAS 2018-19",
        story:
            "First of all, I would like to thank each and everyone for making my tenure (2018-19) a memorable one. When I was in my first year, I was a project member in CFI club and participated in TechSoc events. There were ups and downs but, I have learnt a lot from all those experiences. Everyone here is a master of something and I have learnt different things from each and every one of them. Ups in my tenure are Events like Reverse coding, SciBizTech, OPC, Celestial hunters and 3D modelling. We did remarkable performance in these events and scored points. Till date, we have the best equipment in our hostel Techroom. More than 100+ students have used Ganga hostel to finish off their course project. We made the best drone among all the hostels and made it available for students who are interested in Drones. I met some great, talented, inspiring people during my tenure, whom I’ve always found committed to excellence. This is the gist of my tenure. A sincere thanks to everyone",
    },
    {
        student: "Ram Kamal",
        event: "MicroMouse Maze, Reverse Coding",
        story:
            "In my sophomore year, I found time to participate only in a couple of Techsoc events, Reverse Coding and Micromouse Maze. I attempted the Reverse Coding prelims with a batchmate of mine from Godav. To both our surprise, we ended up topping the first round! Sadly, we couldn’t land a podium finish in the Finals. I’d attribute this mainly to the fact that neither me nor my partner had touched coding in nearly a year! We were using C and were literally googling how to print stuff (using printf) xD while our competitors were breezing through with Python :3 But it was a great experience!! In the even sem, I signed up for this event called Micromouse Maze, simply because I found the concept very cool. Kudos to Aditya (EE DD 18) and Tanzir (EE DD 18) for cramming for 2 days straight to come up with a working bot. In fact, the algorithm Aditya came up with is leaps and bounds more advanced than what of the other hostels used. One thing I recently only came to know was that, apart from getting certificates and cash, winning Shaastra events also resulted in me getting Ganga some points for Techsoc. That’s another platform we can exploit better next year xD Second year is the ideal time to try your hand at various technical events! Low prep events like Reverse Coding and Brainsqueeze are some unique events insti offers that are sure to tickle your brain. Don’t be hesitant to give your name for the more difficult events either. There’s no shortage of help or places to learn from. Ganga has an abundant tech enthu population. You just need to start looking!",
    },
    {
        student: "Aditya",
        event: "MicroMouse Maze",
        story:
            "I mainly participated in the MicroMouse Maze Event. It was my first TechSoc event (I did not participate in any during my first year). I really enjoyed working on the challenge as it was very unique and interesting. Me and one of my team-mates worked on the solving algorithm and were very ecstatic when it solved the maze in close to least number of steps. One challenge we faced was building the bot and calibrating it. We did not expect so many problems to occur while building the bot and so we started very late. So the bot ended up being built minutes before the competition and we couldn’t calibrate it to take like proper turns and such. But ended up with few problems and something that the upcoming team for next year can look out for!",
    },
    {
        student: "Vignesh",
        event: "MicroMouse Maze",
        story:
            "I participated in Micro mouse maze. It is about building a small sized robot which navigates  to the centre of the maze dynamically. The shortest path is calculated during the first run and  a speed run is implemented on further runs to reach the centre in the smallest possible time.  It was fun learning stuff and watch them when you implement them.  We had a little fuzzy start as much references about the algorithms weren't available. But,  the fundaes got us in the start and we later found out things as we progressed. The  algorithm that we implemented was pretty good and unique. My teammate found a research  paper about the algo part and we used this as the basis for coding. We didnt heed towards  chassis design which was a mistake that could have been avoided. Calibration had to be  done just before the competition. It was kinda difficult to manage in short time and the  chassis added a bit more difficulty. But we managed somehow. T_T This was a damn great  experience!",
    },
]
