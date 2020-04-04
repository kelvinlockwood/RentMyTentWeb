// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import { Buffer } from 'buffer';
import * as _ from 'lodash';

// Data Context for State
import { RootContext } from '../../stores/root.store';
import { WalletContext } from '../../stores/wallet.store';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import useRootStyles from '../../layout/styles/root.styles';
const useCustomStyles = makeStyles(theme => ({
    switchLabel: {
        pointerEvents: 'none',
        marginTop: -9,
    },
    switchControl: {
        marginTop: 8,
        marginLeft: 7,
        marginRight: 2,
    },
    fileInputFieldset: {
        width: '85%',
    },
    fileInput: {
        display: 'none',
    },
    fileName: {
        display: 'inline-block',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    fileNameLabel: {
        verticalAlign: 'middle',
    },
}));


const _maxSupplyInputOptions = {
    step: 10,
    min: 0,
    max: 999999999999999, // = 1 QUADRILLION - 1;  Need larger?  Set to 0 for unlimited (nearly, 2^256-1)
    type: 'number',
};

// Create Route
const CreateCommon = ({ back, next }) => {
    const classes = useRootStyles();
    const customClasses = useCustomStyles();

    const [ rootState, rootDispatch ] = useContext(RootContext);
    const { connectionState, tentListingData } = rootState;

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const [particleName,        setParticleName]        = useState(tentListingData.name || '');
    const [particleDesc,        setParticleDesc]        = useState(tentListingData.desc || '');
    const [particleSymbol,      setParticleSymbol]      = useState(tentListingData.symbol || '');
    const [particleCreator,     setParticleCreator]     = useState(tentListingData.creator || '');
    const [particleIcon,        setParticleIcon]        = useState(tentListingData.icon || 'Upload Icon *');
    const [particleIconBuffer,  setParticleIconBuffer]  = useState(tentListingData.iconBuffer || null);
    const [particleIconBase64,  setParticleIconBase64]  = useState(tentListingData.iconBase64 || null);
    const [particleSupply,      setParticleSupply]      = useState(tentListingData.supply || 0);
    const [isPrivate,           setPrivate]             = useState(tentListingData.isPrivate || false);
    const [formValidated,       setFormValidated]       = useState(false);

    const [isParticleNameValid,    setParticleNameValid]    = useState(true);
    const [isParticleSymbolValid,  setParticleSymbolValid]  = useState(true);
    const [isParticleDescValid,    setParticleDescValid]    = useState(true);
    const [isParticleCreatorValid, setParticleCreatorValid] = useState(true);
    const [isParticleIconValid,    setParticleIconValid]    = useState(true);

    useEffect(() => {
        if (allReady && _.isEmpty(particleCreator)) {
            setParticleCreator(connectedAddress);
            setParticleCreatorValid(!_.isEmpty(connectedAddress));
        }
    }, []);

    useEffect(() => {
        setFormValidated(_validateForm());

        const formData = _getFormData();
        rootDispatch({
            type    : 'UPDATE_CREATION_DATA',
            payload : formData
        });
    }, [
        connectionState,
        particleName,
        particleSymbol,
        particleDesc,
        particleCreator,
        particleSupply,
        particleIcon,
        particleIconBuffer,
        particleIconBase64,
        isPrivate,
    ]);

    const _getFormData = () => {
        return {
            name        : _.trim(particleName),
            desc        : _.trim(particleDesc),
            symbol      : particleSymbol,
            creator     : particleCreator,
            icon        : particleIcon,
            iconBuffer  : particleIconBuffer,
            iconBase64  : particleIconBase64,
            supply      : particleSupply,
            isPrivate,
        };
    };

    const _validateAll = () => {
        setParticleNameValid(!_.isEmpty(particleName));
        setParticleSymbolValid(!_.isEmpty(particleSymbol));
        setParticleCreatorValid(!_.isEmpty(particleCreator));
        setParticleIconValid(!_.isEmpty(particleIconBuffer));
        setParticleDescValid(!_.isEmpty(particleDesc));
    };

    const _validateForm = () => {
        const conditions = [
            _.isEmpty(connectionState),
            !_.isEmpty(particleName),
            !_.isEmpty(particleSymbol),
            !_.isEmpty(particleDesc),
            !_.isEmpty(particleCreator),
            !_.isEmpty(particleIconBuffer),
        ];
        return _.every(conditions, Boolean);
    };

    const _cleanParticleIconDisplay = (filename) => {
        return _.last(filename.split('\\'));
    };

    const _handleMaxSupplyBlur = () => {
        if (_.isEmpty(particleSupply) || particleSupply < _maxSupplyInputOptions.min) {
            setParticleSupply(_maxSupplyInputOptions.min);
        } else if (particleSupply > _maxSupplyInputOptions.max) {
            setParticleSupply(_maxSupplyInputOptions.max);
        }
    };

    const _updateParticleName = evt => {
        const value = evt.target.value;
        setParticleName(value);
        setParticleNameValid(!_.isEmpty(value));
    };

    const _updateParticleSymbol = evt => {
        const value = _.trim(_.toUpper(evt.target.value));
        setParticleSymbol(value);
        setParticleSymbolValid(!_.isEmpty(value));
    };

    const _updateParticleCreator = evt => {
        const value = _.trim(evt.target.value);
        setParticleCreator(value);
        setParticleCreatorValid(!_.isEmpty(value));
    };

    const _updateParticleIcon = evt => {
        evt.preventDefault();
        evt.stopPropagation();

        const value = evt.target.value;
        const file = evt.target.files[0];
        if (_.isUndefined(file)) { return; }

        const fileExt = _.last(value.split('.'));
        setParticleIcon(value);
        setParticleIconValid(!_.isEmpty(value));

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            const buffer = Buffer(reader.result);
            setParticleIconBuffer(buffer);
            setParticleIconBase64(`data:image/${fileExt};base64,${buffer.toString('base64')}`);
        };
    };

    const _updateParticleDesc = evt => {
        const value = evt.target.value;
        setParticleDesc(value);
        setParticleDescValid(!_.isEmpty(value));
    };

    const _updateParticleSupply = evt => {
        setParticleSupply(evt.target.value);
    };

    const _togglePrivate = (evt, _private) => {
        setPrivate(_private);
    };

    const _handleSubmit = async evt => {
        evt.preventDefault();
        if (!formValidated) {
            return _validateAll();
        }
        next();
    };

    return (
        <>
            <Box py={3}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={6}>
                        <TextField
                            id="particleTypeName"
                            label="Name"
                            variant="outlined"
                            onChange={_updateParticleName}
                            value={particleName}
                            fullWidth
                            required
                            error={!isParticleNameValid}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="particleTypeSymbol"
                            label="Symbol"
                            variant="outlined"
                            onChange={_updateParticleSymbol}
                            value={particleSymbol}
                            fullWidth
                            required
                            error={!isParticleSymbolValid}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12}>
                        <TextField
                            id="particleTypeDesc"
                            label="Description"
                            variant="outlined"
                            onChange={_updateParticleDesc}
                            value={particleDesc}
                            multiline
                            rows="4"
                            fullWidth
                            required
                            error={!isParticleDescValid}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="particleTypeCreator"
                            label="Creator"
                            variant="outlined"
                            onChange={_updateParticleCreator}
                            value={particleCreator}
                            fullWidth
                            required
                            error={!isParticleCreatorValid}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    className={customClasses.switchControl}
                                    checked={isPrivate}
                                    onChange={_togglePrivate}
                                    value="private"
                                    required
                                />
                            }
                            label="Private Minting"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="particleTypeSupply">Max-Supply</InputLabel>
                            <OutlinedInput
                                id="particleTypeSupply"
                                onChange={_updateParticleSupply}
                                onBlur={_handleMaxSupplyBlur}
                                value={particleSupply}
                                fullWidth
                                labelWidth={90}
                                inputProps={_maxSupplyInputOptions}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <FormControl
                                required
                                error={!isParticleIconValid}
                                component="fieldset"
                                className={customClasses.fileInputFieldset}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        classes={{
                                            root: customClasses.fileName,
                                            label: customClasses.fileNameLabel,
                                        }}
                                        control={
                                            <>
                                                <input
                                                    id="particleTypeIcon"
                                                    type="file"
                                                    accept="image/*"
                                                    className={customClasses.fileInput}
                                                    onChange={_updateParticleIcon}
                                                    required
                                                />
                                                <IconButton
                                                    color="secondary"
                                                    aria-label="upload icon"
                                                    component="span"
                                                >
                                                    <PhotoCamera />
                                                </IconButton>
                                            </>
                                        }
                                        label={_cleanParticleIconDisplay(particleIcon)}
                                    />
                                </FormGroup>
                                <FormHelperText error={true}>{!isParticleIconValid ? 'Particle Icon required' : ''}</FormHelperText>
                            </FormControl>
                            <Avatar alt="User Icon" src={particleIconBase64}>?</Avatar>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Box py={2}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            className={classes.gridRow}
                        >
                            <Button
                                type="button"
                                variant="outlined"
                                size="large"
                                onClick={back}
                            >
                                back
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            className={classes.gridRow}
                            style={{textAlign:'right'}}
                        >
                            <Button
                                type="button"
                                // disabled={!formValidated}
                                variant={formValidated ? 'contained' : 'outlined'}
                                color={formValidated ? 'primary' : 'default'}
                                size="large"
                                onClick={_handleSubmit}
                                className={formValidated ? '' : customClasses.visiblyDisabledButton}
                            >
                                next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default CreateCommon;
