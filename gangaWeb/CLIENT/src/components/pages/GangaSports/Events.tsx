import React, { Fragment, Component } from "react"
import Typography from "@material-ui/core/Typography"
// import { SportsNavContext } from "../../../contexts/SportsNavContext";

class Events extends Component {
    render() {
        const tablist = ["Inter-Hostel", "Intra-Hostel"]
        return (
            // <SportsNavContext.Consumer>
            //   {(nav) => {
            //     return (
            <Fragment>
                {/* {!!tablist && nav({ tablist })} */}
                <Typography className="title" variant="h3" align="center" color="textSecondary">
                    Events 2019-20
                </Typography>
            </Fragment>
        )
    }
}
//   </SportsNavContext.Consumer>
// );
// }

export default Events
