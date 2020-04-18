// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useCustomStyles = makeStyles(theme => ({
    loadingContainer: {
        margin: '2rem 0',
    },
    loadingPaper: {
        padding: '1rem 1.5rem',

        '& span': {
            marginLeft: '1.4rem',
            fontSize: '1.15rem',
            lineHeight: '2rem',
            verticalAlign: 'super',
            fontFamily: 'Roboto, Courier, monospace',
        }
    },

}));


export default ({msg = 'Loading..'}) => {
    const customClasses = useCustomStyles();
    return (
        <div className={customClasses.loadingContainer}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Paper elevation={2} className={customClasses.loadingPaper}>
                    <CircularProgress />
                    <span>{msg}</span>
                </Paper>
            </Grid>
        </div>
    );
};
