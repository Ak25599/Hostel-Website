import React from "react"
import Typography from "@material-ui/core/Typography"

import EditIcon from "@material-ui/icons/Assignment"
import BoardGamesIcon from "@material-ui/icons/VideogameAsset"
import FinanceIcon from "@material-ui/icons/MonetizationOn"
import Courses from "./Courses"
import Stories from "./Stories"
// import Slider from "./slider"


const TechSoc = (props) => {
    return (
        <div style={{ height: "100%" }}>
            <Typography id="TechSoc" variant="h3" align="center" color="textSecondary">
                TechSoc
            </Typography>
            <div className="Tech">
                <h1 id="TechS">Ganga Website | Tech Section</h1>
                <Courses />
                <Stories />
            </div>
         </div>
    )
}

export default TechSoc
