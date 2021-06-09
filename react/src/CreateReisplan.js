import React from "react";

// Material-UI
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        margin: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 735,
    },
}));

function CreateReisplan(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
        props.singleReisplan.naam = "";
        props.singleReisplan.omschrijving = "";
        props.singleReisplan.land = "";
        props.singleReisplan.vertrekdatum = "";
        props.singleReisplan.terugkomstdatum = "";
        setOpen(true);
    };
    const handleModalClose = () => {
        setOpen(false);
    };

    const saveReisplan = () => {
        props.createReisplan();
        handleModalClose();
    }

return (
    <>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
            Plan een reis!
        </Button>

        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>

                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Nieuw reisplan
                </Typography>

                <div class="row">
                    <div class="col">
                        <TextField
                        name="naam"
                        style={{ margin: 8 }}
                        label="Naam"
                        placeholder="Naam van de reis"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={ props.singleReisplan.naam }
                        variant="outlined"
                        onChange={props.handleChange}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <TextField
                        name="omschrijving"
                        style={{ margin: 8 }}
                        label="Omschrijving"
                        placeholder="Omschrijving van de reis"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={ props.singleReisplan.omschrijving }
                        variant="outlined"
                        onChange={props.handleChange}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <TextField
                            name="vertrekdatum"
                            label="Vertrekdatum"
                            type="date"
                            className={classes.textField}
                            onChange={props.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />                        
                        <TextField
                            name="terugkomstdatum"
                            label="Terugkomstdatum"
                            onChange={props.handleChange}
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="land">Land</InputLabel>
                            <Select
                            native
                            value={props.singleReisplan.land}
                            onChange={props.handleChange}
                            inputProps={{
                                name: 'land',
                                id: 'land',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value={ 'Netherlands' }>Nederland</option>
                            <option value={ 'Spain' }>Spanje</option>
                            <option value={ 'Norway' }>Noorwegen</option>
                            </Select>
                        </FormControl>
                    </div>
                </div>


                <div class="row">
                    <div class="col__buttons">
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button variant="contained" className={ classes.button } onClick={handleModalClose}>
                            Annuleren
                        </Button>
                        <Button variant="contained" className={ classes.button } color="primary" onClick={saveReisplan}>
                            Opslaan
                        </Button>
                    </Grid>
                    </div>
                </div>

            </div>
        </Modal>

        </>
    );
}

export default CreateReisplan;
