import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Flag from 'react-world-flags';
import countriesData from '../countries';

// ISO 3166-1 alpha-2
function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

class Country extends React.Component {
    handleChange = (e, object, caller) => {
        this.props.onChange(e, object, caller, this.props.name);
    }

    render(){
        return (
            <Autocomplete
                fullWidth
                id="country"
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={this.handleChange.bind(this)}
                renderOption={(option) => (
                    <React.Fragment>
                        <Flag code={option.code.toLowerCase()} height="18" width="20" className={'country-image'}/>
                        <span>{option.label}</span>
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={this.props.errors}
                        helperText={this.props.errors ? "Please select a valid country." : ""}
                        label="Choose your country"
                        variant="outlined"
                        margin="dense"
                        autoComplete={"off"}
                        inputProps={{
                            ...params.inputProps,
                            name: 'country-selector'
                        }}
                    />
                )}
            />
        )
    }
}

export default Country;

const countries = countriesData.allCountries();