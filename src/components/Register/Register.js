import React from 'react';
import "./Register.css"
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Country from "../Forms/Country/Country";
import PhoneSelectorMaterial from "../Forms/Phone/Phone";

class Register extends React.Component {
    state = {
        name: "",
        last: "",
        country: "",
        address: "",
        address_alternative: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        password: "",
        agreement: "",
        errors: {
            name: false,
            last: false,
            country: false,
            zip: false,
            email: false,
            phone: false,
            password: false,
        }
    }

    constructor(props) {
        super(props);
    }

    handleChange = (e, object, caller, optionalName) => {
        if(e.target.name){
            if(e.target.name.includes('selector')){
                return;
            }
        }

        const isCheckBox = e.target.type === "checkbox";
        let name = e.target.name;
        let value = isCheckBox ? e.target.checked : e.target.value;

        if(caller){
            switch (caller){
                case 'select-option':
                    this.setState({
                        [optionalName]: object.code
                    });
                    break;
                default:
                    this.setState({
                        [optionalName]: ''
                    });
                    break;
            }
        } else {
            if(e.target.validity){
                if(name === "phone"){
                    value = object.phone + this.clearPhoneNumber(value);
                }
                this.setState({
                   [name]: e.target.validity.valid ? value : this.state[name]
                });
            }
        }
    }

    clearPhoneNumber = (value) => {
        if(value){
            return value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
        }
        return value;
    }

    validate = () => {
        let valid = true;
        const errors = {};
        const matchCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if(!this.state.agreement){
            valid = false;
        }

        // Name validation
        if(this.state.name.length <= 3 || matchCharacters.test(String(this.state.name))){
            valid = false;
            errors.name = true;
        } else {
            errors.name = false;
        }

        // Last name validation
        if(this.state.last.length <= 3 || matchCharacters.test(String(this.state.last))){
            valid = false;
            errors.last = true;
        } else {
            errors.last = false;
        }

        // Country validation
        if(this.state.country.length !== 2){
            valid = false;
            errors.country = true;
        } else {
            errors.country = false;
        }

        // Zip validation
        if(!this.state.zip.length || this.state.zip.length > 5 || isNaN(this.state.zip)){
            valid = false;
            errors.zip = true;
        } else {
            errors.zip = false;
        }

        // Email validation
        const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(!expression.test(String(this.state.email).toLowerCase())){
            valid = false;
            errors.email = true;
        } else {
            errors.email = false;
        }

        // Phone validation
        if(this.state.phone.length < 6 || isNaN(this.state.phone)){
            valid = false;
            errors.phone = true;
        } else {
            errors.phone = false;
        }

        // Password validation
        const matchPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{8,})/;
        if(this.state.password.length < 8 || !matchPassword.test(String(this.state.password))){
            valid = false;
            errors.password = true;
        } else {
            errors.password = false;
        }

        this.setState(prevState => ({
            errors: {                   // object that we want to update
                ...prevState.errors,    // keep all other key-value pairs
                ...errors               // update the object or an specific key with pair
            }
        }));

        return valid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = this.validate();
        // if(isValid){
        //     // Call API Register
        //     const apiUrl = 'http://mmserver.com:8080/api/register';
        //     fetch(apiUrl)
        //         .then((response) => response.json())
        //         .then((data) => {
        //             console.log('This is your data', data)
        //         });
        // }


        const apiUrl = 'http://mmserver.com:8080/api/register';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((data) => {
                // localStorage.setItem('@mooney_moon_token', 'item');
                console.log('This is your data', data)
            });
    }

    render() {
        return (
            <div className="container p-0">
                <Header />

                <div className="body">
                    <div className="container-sm inner-space">
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center"
                              className='pb-4'
                        >
                            <h1>Register your account!</h1>
                            <h4 className="text-subtitle">Your Moon travel experience start here</h4>
                        </Grid>

                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} md={7}>
                                <form onSubmit={this.handleSubmit}
                                      noValidate
                                      autoComplete="off"
                                      className="w-100">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <TextField
                                                fullWidth
                                                id="name"
                                                name="name"
                                                label="Full name as in your ID"
                                                value={this.state.name}
                                                variant="outlined"
                                                margin="dense"
                                                inputProps={{ maxLength: 20, pattern: "^[^0-9\\s][a-zA-Z\\p{L}]*[\\s]*[a-zA-Z\\p{L}]*$" }}
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                                helperText={this.state.errors.name ? "Please choose a valid name." : ""}
                                                error={this.state.errors.name}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <TextField
                                                fullWidth
                                                id="last"
                                                name="last"
                                                label="Full lastname as in your ID"
                                                value={this.state.last}
                                                variant="outlined"
                                                margin="dense"
                                                inputProps={{ maxLength: 20, pattern: "^[^0-9\\s][a-zA-Z\\p{L}]*[\\s]*[a-zA-Z\\p{L}]*$" }}
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                                helperText={this.state.errors.last ? "Please choose a valid last name." : ""}
                                                error={this.state.errors.last}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <Country
                                                name="country"
                                                errors={this.state.errors.country}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <TextField
                                                fullWidth
                                                id="address"
                                                name="address"
                                                label="Your address"
                                                value={this.state.address}
                                                variant="outlined"
                                                margin="dense"
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <TextField
                                                fullWidth
                                                id="address_alternative"
                                                name="address_alternative"
                                                label="Apt/Ste/Fl"
                                                value={this.state.address_alternative}
                                                variant="outlined"
                                                margin="dense"
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <TextField
                                                fullWidth
                                                id="city"
                                                name="city"
                                                label="City"
                                                value={this.state.city}
                                                variant="outlined"
                                                margin="dense"
                                                inputProps={{ maxLength: 30, pattern: "^[a-zA-Z\\p{L}]*" }}
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <TextField
                                                fullWidth
                                                id="state"
                                                name="state"
                                                label="State"
                                                value={this.state.state}
                                                variant="outlined"
                                                margin="dense"
                                                inputProps={{ maxLength: 30, pattern: "^[a-zA-Z\\p{L}]*" }}
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <TextField
                                                fullWidth
                                                id="zip"
                                                name="zip"
                                                label="Zip code"
                                                value={this.state.zip}
                                                variant="outlined"
                                                margin="dense"
                                                inputProps={{ maxLength: 5, pattern: "[0-9]*" }}
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                                helperText={this.state.errors.zip ? "Please choose a valid zip." : ""}
                                                error={this.state.errors.zip}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <PhoneSelectorMaterial
                                                variant="outlined"
                                                margin="dense"
                                                helperText={this.state.errors.phone ? "Please insert a valid phone number." : ""}
                                                error={this.state.errors.phone}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label="Your email"
                                                value={this.state.email}
                                                variant="outlined"
                                                margin="dense"
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                                helperText={this.state.errors.email ? "Please choose a valid email. Should be like example@email.com" : ""}
                                                error={this.state.errors.email}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <TextField
                                                fullWidth
                                                type="password"
                                                id="password"
                                                name="password"
                                                label="Choose your password"
                                                value={this.state.password}
                                                variant="outlined"
                                                margin="dense"
                                                inputProps={{ maxLength: 18 }}
                                                onChange={this.handleChange}
                                                autoComplete={"password-now"}
                                                helperText={this.state.errors.password ?
                                                    (<span>
                                                            Please choose a valid password. <br/>
                                                            Must contain at least 8 characters, including numbers,
                                                            uppercase letters, lowercase letters and special characters as (*, /, $, %, #, etc...)
                                                        </span>) : ""}
                                                error={this.state.errors.password}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                        name="agreement"
                                                        color="primary"
                                                        onChange={this.handleChange}
                                                    />
                                                }
                                                 label={
                                                     <div>
                                                         When click <strong className="text-uppercase">Sign In</strong> you're accepting our <Link to='/' className="">Terms and Conditions</Link>
                                                         <br/> and the <Link to="/" className="">Privacy Policy</Link>
                                                     </div>
                                                 }
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit"
                                        variant="outlined"
                                        color="primary"
                                        disableElevation
                                        className='btn-block'
                                        disabled={!this.state.agreement}>
                                        Sign In
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Register;