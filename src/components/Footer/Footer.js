import React from 'react';
import "./Footer.css"
import {Grid} from "@material-ui/core";
import HomeRounded from '@material-ui/icons/HomeRounded'
import {RoundedButton} from "../RoundedButton/RoundedButton";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import {Social} from "../Social/Social";
import {Copyright} from "../Copyright/Copyright";

const Footer = () => (
    <div>
        <AppBar className="footer app-fixed-bottom" position="fixed">
            <Container maxWidth="md">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs>
                        <Grid container justify="center" alignItems="center">
                            <div>
                                <Copyright />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container justify="center" alignItems="center">
                            <div className="position-absolute t-25">
                                <RoundedButton icon={<HomeRounded />} label='Home' />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container justify="center" alignItems="center">
                            <div>
                                <Social />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    </div>
)

export { Footer }
