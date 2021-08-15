import React from "react"
import clsx from "clsx"
import { Button } from "@material-ui/core"
import { NavLink, Link } from "react-router-dom"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import HomeIcon from "@material-ui/icons/Home"
import ReportIcon from "@material-ui/icons/Report"
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary"
import PaymentIcon from "@material-ui/icons/Payment"
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer"
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import { withStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import GangaIcon from "../../../utils/images/GenImages/gangaicon.jpg"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,        
        backgroundColor:"transparent"

    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))

const StyledMenu = (props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
)

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: "transparent",
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem)

const sportsSections = [
    { title: "Achievements" },
    { title: "Know Your Captain" },
    { title: "Facilities And Infrastructure" },
    { title: "About Us" },
]
const section1 = [
    { title: "Home", url: "" },
    { title: "Complaint Portal", url: "login" },
    { title: "Ganga Library", url: "GangaLibrary" },
    { title: "Alumni Donation Portal", url: "AlumniDonationPortal" },
]

const section2 = [
    { title: "TechSoc", url: "TechSoc" },
]

export default function PersistentDrawerLeft() {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <AppBar
                color="transparent"
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ position: "relative" }}>
                    <IconButton
                        color="default"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={GangaIcon} alt="Icon" className="icon" />

                    <Typography variant="h6" noWrap>
                        GANGA OFFICIAL
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {section1.map((item, index) => (
                        <NavLink to={"/" + item.url}>
                            <ListItem button key={item.title}>
                                <ListItemIcon>
                                    {index === 0 ? (
                                        <HomeIcon />
                                    ) : index === 1 ? (
                                        <ReportIcon />
                                    ) : index === 2 ? (
                                        <LocalLibraryIcon />
                                    ) : (
                                        <PaymentIcon />
                                    )}
                                </ListItemIcon>

                                <ListItemText primary={item.title} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
                <Divider />
                <List>
                    {section2.map((item, index) => (
                        <Link to={"/" + item.url}>
                            <ListItem button key={item.title}>
                                <ListItemIcon>
                                    {index === 0 ? <PhonelinkSetupIcon /> : <LibraryBooksIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        </Link>
                    ))}
                    <ListItem
                        button
                        key="Ganga Sports"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <ListItemIcon>
                            <SportsSoccerIcon />
                        </ListItemIcon>

                        <ListItemText primary="Ganga Sports" />
                    </ListItem>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {sportsSections.map((sportsSection) => (
                            <NavLink to={"/Ganga Sports/" + sportsSection.title}>
                                <StyledMenuItem>
                                    {/*@ts-ignore*/}
                                    <Button
                                        noWrap
                                        key={sportsSection.title}
                                        className={classes.root}
                                    >
                                        {sportsSection.title}
                                    </Button>
                                </StyledMenuItem>
                            </NavLink>
                        ))}
                    </StyledMenu>
                </List>
            </Drawer>
        </div>
    )
}
