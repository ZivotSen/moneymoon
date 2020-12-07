import React from 'react';
import './HorizontalList.css';

import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

class HorizontalList extends React.Component {
    constructor(props) {
        super(props);
        this.menus = props.menus;
    }

    render = () => (
        <div>
            <List className="flex-container menu-flex-items">
                {this.menus.map((menu, index) => {
                    if(menu.name !== "DIVIDER"){
                        if(menu.type === "item"){
                            return (
                                <ListItem button key={index} component={Link} to={menu.route}>
                                    {menu.name}
                                </ListItem>
                            );
                        } else if(menu.type === "button"){
                            return (
                                <Button
                                    variant="contained"
                                    className="mt-1"
                                    color="primary"
                                    key={index}
                                    component={Link} to={menu.route}>
                                    {menu.name}
                                </Button>
                            );
                        }
                    }
                    return (<div key={index}> </div>);
                })}
            </List>
        </div>
    )
}

export {HorizontalList}