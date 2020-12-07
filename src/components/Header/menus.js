import React from 'react';

import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import HowToRegRoundedIcon from '@material-ui/icons/HowToRegRounded';

const menus = [
    {
        name: 'Help',
        type: 'item',
        icon: <HelpRoundedIcon />,
        route: '/'
    },
    {
        name: 'About',
        type: 'item',
        icon: <InfoRoundedIcon />,
        route: '/'
    },
    {
        name: 'Login',
        type: 'item',
        icon: <VpnKeyRoundedIcon />,
        route: '/'
    },
    {
        name: 'DIVIDER',
    },
    {
        name: 'Sing In',
        type: 'button',
        icon: <HowToRegRoundedIcon />,
        route: '/register'
    },
];

const menuList = () => {
    return menus;
}

export default menuList()