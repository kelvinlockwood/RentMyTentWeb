// Frameworks
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

// Logo Image
import Logo from '../images/logo/Rent-my-tent.svg';

// Common
import { GLOBALS } from '../utils/globals';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';


const Header = ({siteTitle, onRedirect}) => {
    const classes = useLandingStyles();
    return (
        <header className={classes.heroHeader}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <a href={'#'} onClick={onRedirect()} className={classes.heroLogo}>
                    <Logo className={classes.heroLogoImg} />
                </a>

                <div className={classes.heroMenu}>
                    <Link href="#" className={classes.heroMenuLink} onClick={onRedirect('about')}>
                        About
                    </Link>

                    <Link href="#" className={classes.heroMenuLink} onClick={onRedirect('how')}>
                        How it works
                    </Link>

                    <Link href="#" className={classes.heroMenuLink} onClick={onRedirect(`${GLOBALS.APP_ROOT}/list`)}>
                        Get Started
                    </Link>
                </div>
            </Grid>
        </header>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    onRedirect: PropTypes.func.isRequired,
};

export default Header;
