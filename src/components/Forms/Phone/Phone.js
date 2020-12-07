import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Flag from 'react-world-flags'
import countriesData from '../countries';

class PhoneSelectorMaterial extends React.Component {
    state = {
        openSearch: false,
        phone: '',
        countryObject: {
            code: "US",
            label: "United States",
            phone: "1",
            mask: '(...) ...-....',
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleInput, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleInput, false);
    }

    handleChange = (e, object, caller) => {
        if(caller){
            switch (caller) {
                case 'select-option':
                    if(!object.mask){
                        object.mask = '..........';
                    }
                    this.setState(prevState => ({
                        phone: '',
                        openSearch: false,
                        countryObject: {                // object that we want to update
                            ...prevState.countryObject, // keep all other key-value pairs
                            ...object                   // update the object or an specific key with pair
                        }
                    }));

                    break;
                case 'clear':
                    this.setState(prevState => ({
                        phone: '',
                        openSearch: true
                    }));
                    break;
                default:
                    const defaultObject = {
                        code: "US",
                        label: "United States",
                        phone: "1",
                        mask: '(...) ...-....',
                    }
                    this.setState(prevState => ({
                        phone: '',
                        openSearch: false,
                        countryObject: {                // object that we want to update
                            ...prevState.countryObject, // keep all other key-value pairs
                            ...defaultObject            // update the object
                        }
                    }));

                    break;
            }
        }
    }
    handleOpen = (e) => {
        this.setState({
            openSearch: true
        })
    }
    handleClose = (e) => {
        this.setState({
            openSearch: false
        })
    }

    getCountryByCode = (code) => {
        let searchCode = code || 'us';
        return countries.filter((e) => e.code === searchCode.toUpperCase())
    }

    handleInput = (e) => {
        if(e.target.name === "phone"){
            if(Number(e.keyCode) === 32){
                e.preventDefault();
                return;
            }

            if(!isNaN(this.resetNumber(e.target.value))){
                if(e.keyCode !== 8){
                    if(Number(e.keyCode) < 48 || Number(e.keyCode) > 57){
                        e.preventDefault();
                        return;
                    }
                }

                if(this.resetNumber(e.target.value).length > this.correctMaskLength()){
                    return;
                }

                let actualValue = this.formatNumber(this.resetNumber(e.target.value));
                if(e.keyCode === 8){
                    actualValue = this.removeMaskCharsOnDelete(e.target.value,
                        e.target.selectionStart, e.target.selectionEnd);
                }

                if(actualValue !== false){
                    this.setState({
                        [e.target.name]: actualValue
                    })
                }
            }

            this.props.onChange(e, this.state.countryObject);
        }
    }

    formatNumber = (value) => {
        let pattern = this.state.countryObject.mask || '..........';

        if(value.length <= this.correctMaskLength()){
            let i = 0;
            let result = pattern.replace(/[.]/g, _ => value.toString()[i++]);

            let undefinedIndexOn = result.indexOf('u');
            if(undefinedIndexOn === -1){
                undefinedIndexOn = pattern.length;
            }
            return result.substr(0, undefinedIndexOn);
        }
        return false;
    }
    resetNumber = (value) => {
        if(value){
            return value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
        }
        return value;
    }
    correctMaskLength = () => {
        let pattern = this.state.countryObject.mask || '..........';
        return this.resetNumber(pattern).length;
    }
    removeMaskCharsOnDelete = (value, positionStart, positionEnd) => {
        let pattern = this.state.countryObject.mask || '..........';

        if(positionStart === 0){
            return '';
        }

        if(this.getMaskCharPosition(pattern, Number(positionEnd)) === ' '){
            return value.substring(0, value.length - 2);
        }

        if(this.getMaskCharPosition(pattern, Number(positionEnd)) === '-'
            || this.getMaskCharPosition(pattern, Number(positionEnd)) === ')'
            || this.getMaskCharPosition(pattern, Number(positionEnd)) === '('
            || this.getMaskCharPosition(pattern, Number(positionEnd)) === ' '
        ){
            return value.substring(0, value.length - 1);
        }
        return value;
    }
    getMaskCharPosition = (mask, position) => {
        let pattern = mask || '..........';
        return pattern.charAt(position - 1);
    }

    render(){
        return (
            <div className={'general-phone-container'}>
                <TextField
                    fullWidth
                    id="phone-input-with-icon"
                    name={this.props.name || "phone"}
                    label={this.props.label || "Phone"}
                    value={this.state.phone || ''}
                    variant={this.props.variant}
                    margin={this.props.margin}
                    helperText={this.props.helperText}
                    error={this.props.error}
                    autoComplete={"password-now"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button onClick={this.handleOpen} className={'flag-button-container'}>
                                    <Flag code={this.state.countryObject.code.toLowerCase() || 'us'} height="18" width="20" />
                                </Button>
                                <div>
                                    <span>{"+"+this.state.countryObject.phone}</span>
                                </div>
                            </InputAdornment>
                        )
                    }}
                    onChange={this.handleInput.bind(this)}
                    onFocus={this.handleClose}
                />

                {this.state.openSearch && (
                    <Box className="box-absolute">
                        <Autocomplete
                            fullWidth
                            id="phone-selector"
                            name="phone-selector"
                            options={countries}
                            getOptionLabel={(option) => option.label}
                            onChange={this.handleChange}
                            autoHighlight
                            openOnFocus
                            value={this.state.countryObject}
                            renderOption={(option) => (
                                <React.Fragment>
                                    <div>
                                        <Flag code={option.code.toLowerCase()} height="18" width="20" className={'country-image'}/>
                                        <span className="country-name">{option.label}</span>
                                        <span className="dial-code">+{option.phone}</span>
                                    </div>
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        name: 'search-phone-selector',
                                        autoComplete: 'another-new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </Box>
                )}
            </div>
        )
    }
}

export default PhoneSelectorMaterial;

const countries = countriesData.allCountries();