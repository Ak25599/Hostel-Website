import React, { useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as ROUTES from "../constants/routes"
import AuthUserContext, { withAuthUserProvider } from "../contexts/session"
import { useMeQuery, UserRole } from "../generated"

import Navbar from "../components/pages/Navbar/Navbar"
import Footer from "../components/pages/Footer/Footer"
import Home from "../components/pages/Home2/Home2"
import Login from "../components/pages/SignIn"

import TechSoc from "../components/pages/TechSoc/TechSoc"
import AddBook from "../components/pages/GangaLibrary/components/AddBook"
// import BookRequest from "../components/pages/GangaLibrary/components/BookRequest"
import ComplaintPortal from "../components/pages/ComplaintPortal/ComplaintPortal"
import AdminComplaintPortal from "../components/pages/ComplaintPortal/AdminPortal"

import AlumniDonationPortal from "../components/pages/AlumniDonationPortal/AlumniDonationPortal"
import GangaLibrary from "../components/pages/GangaLibrary/App"
import SpiritOfSports from "../components/pages/GangaSports/SpiritOfSports"
import FacilitiesAndInfrastructure from "../components/pages/GangaSports/FacilitiesAndInfrastructure"
import Events from "../components/pages/GangaSports/Events"
import Achievements from "../components/pages/GangaSports/Achievements"
import AboutUs from "../components/pages/GangaSports/AboutUs"
import KnowYourCaptain from "../components/pages/GangaSports/KnowYourCaptain"
import LitSecLogin from "../components/pages/SignIn/LitSecLogin"

//@ts-ignore
export default withAuthUserProvider(({ Component, pageProps }) => {
    const { setAuthUser } = useContext(AuthUserContext)
    const { data, error } = useMeQuery()
    if (data && data.me) setAuthUser(data.me)
    if (error) console.log(error)
    return (
        <Router>
            {
                <div className="App">
                    <Navbar />
                    <div className="head"></div>
                    <Switch>
                        <Route exact path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.TECHSOC} component={TechSoc} />
                        <Route path={ROUTES.LOGIN} component={Login} />

                        <Route path={ROUTES.COMPLAINTPORTAL} component={ComplaintPortal} />
                        <Route
                            path={ROUTES.ADMINCOMPLAINTPORTAL}
                            component={AdminComplaintPortal}
                        />
                        <Route path={ROUTES.LITSECLOGIN} component={LitSecLogin} />
                        <Route
                            path={ROUTES.ALUMNIDONATIONPORTAL}
                            component={AlumniDonationPortal}
                        />
                        <Route path={ROUTES.GANGALIBRARY} component={GangaLibrary} />
                        <Route path={ROUTES.ADMINLIBRARY} component={AddBook} />
                        {/* <Route path={ROUTES.REQUEST} component={BookRequest} /> */}
                        <Route path={ROUTES.SPIRIT} component={SpiritOfSports} />
                        <Route path={ROUTES.EVENTS} component={Events} />
                        <Route path={ROUTES.ACHIEVEMENTS} component={Achievements} />
                        <Route path={ROUTES.ABOUTUS} component={AboutUs} />
                        <Route path={ROUTES.KNOWYOURCAPTAIN} component={KnowYourCaptain} />
                        <Route path={ROUTES.FACILITIES} component={FacilitiesAndInfrastructure} />
                    </Switch>
                    <Footer />
                </div>
            }
        </Router>
    )
})
