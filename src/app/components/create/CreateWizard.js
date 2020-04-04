// Frameworks
import React, { useState, useEffect, useContext } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// App Components
import CreateCommon from './CreateCommon';
import FormCreateNonFungible from './FormCreateNonFungible';
import FormCreateConfirm from './FormCreateConfirm';

// App Images
import partyPopperImg from '../../../images/party-popper.png';

// Data Context for State
import { RootContext } from '../../stores/root.store';


const useCustomStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

const getSteps = () => {
    return [
        'Describe Your Tent',
        'Specify Attributes',
        'Register Token',
    ];
};

const getStepContent = ({onSubmitForm, step, back, next}) => {
    switch (step) {
        case 0:
            return (<CreateCommon back={back} next={next} />);
        case 2:
            return (<FormCreateNonFungible back={back} next={next} />);
        case 3:
            return (<FormCreateConfirm back={back} next={onSubmitForm} />);
        default:
            return 'Unknown step';
    }
};

function CreateWizard({ onSubmitForm }) {
    const customClasses = useCustomStyles();

    const [, rootDispatch] = useContext(RootContext);

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    useEffect(() => {
        return () => {
            rootDispatch({type: 'CLEAR_CREATION_DATA'});
        };
    }, []);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        rootDispatch({type: 'CLEAR_CREATION_DATA'});
    };

    const _handleSubmitForm = (formData) => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        onSubmitForm(formData);
    };

    return (
        <div className={customClasses.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, step) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent component="div">
                            {
                                getStepContent({
                                    step,
                                    onSubmitForm: _handleSubmitForm,
                                    back: handleBack,
                                    next: handleNext,
                                })
                            }
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={customClasses.resetContainer}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <img src={partyPopperImg} alt="Party Popper" style={{width: 200}} />
                    </Grid>
                    <Box py={3}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Typography>Finished! Your Tent-Listing is being created!</Typography>
                        </Grid>
                    </Box>
                    <Box py={2}>
                        <Divider />
                    </Box>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button onClick={handleReset} variant="outlined" color="primary" className={customClasses.button}>
                            Restart
                        </Button>
                    </Grid>
                </Paper>
            )}
        </div>
    );
}

export default CreateWizard;