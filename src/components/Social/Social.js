import React from 'react';
import './Social.css'
import {Link} from "react-router-dom";

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from "@material-ui/core/IconButton";

class Social extends React.Component {
    render = () => (
        <div className="social-menu">
            <a href="https://www.facebook.com/"
               rel="noreferrer" target="_blank"
               className="social-icon-container">
                <IconButton aria-label="Facebook" className="social-facebook">
                    <FacebookIcon />
                </IconButton>
            </a>
            <a href="https://www.facebook.com/"
               rel="noreferrer" target="_blank"
               className="social-icon-container">
                <IconButton aria-label="Twitter" className="social-twitter">
                    <TwitterIcon />
                </IconButton>
            </a>
            <a href="https://www.facebook.com/"
               rel="noreferrer" target="_blank"
               className="social-icon-container">
                <IconButton aria-label="Instagram" className="social-instagram">
                    <InstagramIcon />
                </IconButton>
            </a>
        </div>
    )
}

export {Social}