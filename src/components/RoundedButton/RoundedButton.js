import React from 'react';
import { Link } from "react-router-dom";
import "./RoundedButton.css"
import { Grid } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

const RoundedButton = (props) => (
    <div>
        <Grid container direction="column" justify="center" alignItems="center">
            <Link to={props.link ? props.link : "/"} className="btn btn-rounded rounded-circle btn-primary">
                <IconButton aria-label={props.label ? props.label : 'button'}>
                    {props.icon}
                </IconButton>
            </Link>
        </Grid>
    </div>
)

export { RoundedButton }
