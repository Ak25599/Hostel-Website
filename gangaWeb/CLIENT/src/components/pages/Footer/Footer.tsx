import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Divider />
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {"CONTACT US"}
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            {"contact details of warden and managers"}
          </Typography>
        </Container>
      </footer>
    </Fragment>
  );
};

export default Footer;
