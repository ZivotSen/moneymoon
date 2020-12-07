import React from 'react';
import "./Home.css"
import { Grid } from '@material-ui/core';

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

class Home extends React.Component {
    render() {
        return (
            <div className="container p-0">
                <Header />

                <div className="body">
                    <div className="container-sm inner-space" style={{minHeight: '500px'}}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <h1>Content Here</h1>
                        </Grid>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}

export default Home;
