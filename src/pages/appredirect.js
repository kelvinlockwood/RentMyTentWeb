// Frameworks
import React, { useEffect } from 'react';
import { Link, navigate } from 'gatsby';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// App Components
import Layout from '../layout/layout';
import Loading from '../common/Loading';

// Common
import { GLOBALS } from '../utils/globals';

// Custom Theme
import useStandardStyles from '../layout/styles/standard.styles';

const AppRedirect = () => {
    const classes = useStandardStyles();

    useEffect(() => {
        navigate(`${GLOBALS.APP_ROOT}/list`);
    }, []);

    return (
        <Layout>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.contentContainer}
            >
                <Paper elevation={2} className={classes.contentPaper}>
                    <Box py={2} px={3}>
                        <h1>Loading App</h1>
                        <Box py={10}>
                            <Loading msg="please wait.." />
                        </Box>
                        <hr/>
                        <Link to="/">Go back to the homepage</Link>
                    </Box>
                </Paper>
            </Grid>
        </Layout>
    );
};

export default AppRedirect;
