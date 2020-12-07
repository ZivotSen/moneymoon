import React from 'react';
import {Grid} from "@material-ui/core";

import "./Header.css"
import menuList from './menus'

import {Card} from "../Card/Card";
import {Avatar} from "../Avatar/Avatar";
import {RoundedButton} from "../RoundedButton/RoundedButton";
import HomeRounded from "@material-ui/icons/HomeRounded";

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import CollapseMenu from "../CollapseMenu/CollapseMenu";
import {HorizontalList} from "../HorizontalList/HorizontalList";

class Header extends React.Component {
    render() {
        return (
            <div>
                <AppBar className="app-fixed-header" position="fixed">
                    <Container maxWidth="md">
                        <Toolbar>
                            <div className="site-app-header">
                                <HorizontalList menus={[{name: 'MM', type: 'item', route: '/'}]}/>
                            </div>

                            <div className="container-absolute">
                                <div className="container-center mt-1">
                                    <h3>Hello Gaby!</h3>
                                </div>
                            </div>

                            <Hidden smDown>
                                <HorizontalList menus={menuList}/>
                            </Hidden>
                            <Hidden mdUp>
                                <CollapseMenu menus={menuList}/>
                            </Hidden>
                        </Toolbar>

                        {/*<Toolbar>*/}
                        {/*    <Grid container direction="row" justify="center" alignItems="center">*/}
                        {/*        <Grid item xs>*/}
                        {/*            <Grid container justify="center" alignItems="center">*/}
                        {/*                <div className="position-absolute">*/}
                        {/*                    <Avatar />*/}
                        {/*                    /!*<Card />*!/*/}
                        {/*                </div>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}
                        {/*</Toolbar>*/}
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export { Header }

