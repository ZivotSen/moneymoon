import React from 'react';
import './CollapseMenu.css';
import {Link} from "react-router-dom";

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from "@material-ui/core/IconButton";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

class CollapseMenu extends React.Component {
    state = {
        openMenu: false
    }

    constructor(props) {
        super(props);
        this.menus = props.menus;
    }

    toggleDrawer = (status) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({
            openMenu: status
        })
    }

    render() {
        return (
            <div>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Show menu"
                    onClick={this.toggleDrawer(true)}
                >
                    <MenuRoundedIcon />
                </IconButton>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.openMenu}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                    className="fullList"
                >
                    <div
                        className="fullList"
                        role="presentation"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <List>
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="Close menu"
                                className="menu-close-button"
                                onClick={this.toggleDrawer(false)}
                            >
                                <CloseRoundedIcon />
                            </IconButton>

                            {this.menus.map((menu, index) => {
                                if(menu.name === "DIVIDER"){
                                    return (<Divider key={index} />);
                                } else {
                                    return (
                                        <ListItem button key={index} component={Link} to={menu.route}>
                                            <ListItemIcon>{menu.icon}</ListItemIcon>
                                            <ListItemText primary={menu.name} />
                                        </ListItem>
                                    );
                                }

                                // return (<div key={index}></div>);
                            })}
                        </List>
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }
}

export default CollapseMenu;