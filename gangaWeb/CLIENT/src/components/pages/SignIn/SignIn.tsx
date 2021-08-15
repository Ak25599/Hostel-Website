import React, { useContext, useState } from "react"
import styled from "styled-components"
import { AuthUserObject } from "../../../interfaces"
import AuthUserContext, { withAuthorization } from "../../../contexts/session"
import * as ROUTES from "../../../constants/routes"
import { UserRole } from "../../../generated"
import { Modal } from "."
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

//import Login from "../../assets/Login.svg"

const condition = (authUser: AuthUserObject["authUser"] | null) => !authUser.id
export const MainStage = styled.div`
    margin: 16px;
`
export const PageTitle = styled.section`
    flex: 1;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
`

const Roles = [
    {
        label: "Student",
        value: UserRole.Student,
    },
    {
        label: "Admin",
        value: UserRole.Admin,
    },
]
export default (props) => {
    const { authUser } = useContext(AuthUserContext)
    return withAuthorization(
        condition,
        authUser?.role == UserRole.Admin ? ROUTES.ADMINCOMPLAINTPORTAL : ROUTES.COMPLAINTPORTAL
    )(() => {
        const [role, setRole] = useState("")
        const [open, setOpen] = useState(false)
        const setClose = () => {
            setOpen(false)
        }

        return (
            <Grid>
                <Container style={{ minHeight: "100vh" }}>
                    {/* <Container>
                        <img
                            src={Login}
                            style={{ maxWidth: "100%", width: "100%", height: "80vh" }}
                            alt="bubble"
                        />
                    </Container> */}
                    <Container style={{ minWidth: "300px" }}>
                        <Container>
                            <h1>Choose a role to Login</h1>
                        </Container>
                        {Roles.map((role, i) => (
                            <MainStage key={role.value}>
                                <Container>
                                    <Button
                                        style={{
                                            minWidth: "300px",
                                            textAlign: "center",
                                            fontSize: 25,
                                        }}
                                        onClick={() => {
                                            setOpen(true)
                                            setRole(role.label)
                                        }}
                                    >
                                        {role.label}
                                    </Button>
                                </Container>
                            </MainStage>
                        ))}
                    </Container>
                </Container>

                <Modal
                    isOpen={open}
                    onClose={setClose}
                    role={role}
                    value={Roles.find((r) => r.label === role)}
                />
            </Grid>
        )
    })(props)
}
