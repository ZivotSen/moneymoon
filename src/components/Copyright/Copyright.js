import React from 'react';
import './CopyRight.css'
import CopyrightIcon from '@material-ui/icons/Copyright';

const Copyright = () => (
    <div className="copy-right">
        Copyright <CopyrightIcon /> 2019 - {new Date().getFullYear()} Moon INC.
    </div>
)

export { Copyright }