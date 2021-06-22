import React, { useState, useEffect, useCallback } from "react";

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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Service
import { createReisplan, readReisplan, updateReisplan, deleteReisplan } from "./services/getService";

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

function UpdateReisplan(props) {
    const reisplanEmpty = { 
        naam: "",
        omschrijving: "",
        categorie: "0",
        land: "",
        vertrekdatum: "",
        hotels: {
            naam: "",
            prijs: "",
        }
    }
    const [melding, setMelding] = useState();
    const [reisplanID, setReisplanID] = useState(0);
    const [reisplan, setReisplan] = useState(reisplanEmpty);
    const [filterLanden, setFilterLanden] = useState([]);

    const handleChange = e => {
        if (e.target.name === "naam") setReisplan( { ...reisplan, naam: e.target.value } );
        if (e.target.name === "omschrijving") setReisplan( { ...reisplan, omschrijving: e.target.value } );
        if (e.target.name === "vertrekdatum") setReisplan( { ...reisplan, vertrekdatum: e.target.value } );
        if (e.target.name === "terugkomstdatum") setReisplan( { ...reisplan, terugkomstdatum: e.target.value } );
        if (e.target.name === "categorie") {
            setReisplan( { ...reisplan, categorie: e.target.value } );
            getfilterLanden(e.target.value)
        }
        if (e.target.name === "land") setReisplan( { ...reisplan, land: e.target.value } );
    };

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = (e) => {
        
        getfilterLanden("0");
        setMelding("");

        if (props.reisplanId === 0) {
            setReisplanID(0);
            setReisplan(reisplanEmpty);
        } else {
            // Reisplan ophalen
            setReisplanID(props.reisplanId);
            async function getData() {
                var result = await readReisplan(props.reisplanId);
                setReisplan(result);
            }
            getData();
        }

        // Datumvelden vullen kost tijd
        setTimeout(() => {
            setOpen(true);
        }, 500)
    };
    const handleModalClose = () => {
        setOpen(false);
    };

    const verwijderReisplan = () => {

        async function deleteData() {
            var result = await deleteReisplan(reisplanID);
            if (result) {
                props.updateDate();
                setMelding("Het reisplan is verwijderd.");
            } else {
                setMelding("Verwijder is mislukt.");
            }
        }
        deleteData();
        handleModalClose();
    }

    const opslaanReisplan = () => {
        async function updateData() {
            var result;
            if (reisplanID === 0) {
                result = await createReisplan(reisplan);
            } else {
                result = await updateReisplan(reisplanID, reisplan);
            }

            if (result) {
                setReisplanID(result.id);
                props.updateDate();
                setMelding("Het reisplan is opgeslagen.");
            } else {
                setMelding("Opslaan is mislukt.");
            }
        }
        updateData();
    }

    const getfilterLanden = useCallback((categorie) => {
        if (categorie === '0') {
            setFilterLanden(props.landen);
        } else {
            setFilterLanden(props.landen.filter(land => land.category === Number(categorie)));
        }
        console.log("getfilterLanden ", categorie);
        return filterLanden;

    }, [filterLanden, props.landen])

return (
    <>
        <Button size="small" color="primary" data-toggle="modal"
    onClick={handleModalOpen}>
            { props.buttonText }
        </Button>

        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <div style={modalStyle} className={classes.paper}>

                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    { props.buttonText }
                </Typography>

                <div class="row">
                    <div class="col">
                        <TextField
                        id="naam"
                        name="naam"
                        style={{ margin: 8 }}
                        label="Naam"
                        placeholder="Naam van de reis"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={ reisplan.naam }
                        onChange={handleChange}
                        variant="outlined"
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
                        value={ reisplan.omschrijving }
                        onChange={handleChange}
                        variant="outlined"
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <TextField
                            name="vertrekdatum"
                            label="Vertrekdatum"
                            type="date"
                            defaultValue={reisplan.vertrekdatum}
                            className={classes.textField}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />                        
                        <TextField
                            name="terugkomstdatum"
                            label="Terugkomstdatum"
                            type="date"
                            defaultValue={reisplan.terugkomstdatum}
                            className={classes.textField}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="categorie" name="categorie" row value={reisplan.categorie} onChange={handleChange}>
                            <FormControlLabel value={ '0' } control={<Radio />} label="Alles" />
                            {props.categories.map((categorie) => (
                                <FormControlLabel value={ '' + categorie.id } control={<Radio />} label={ categorie.name } />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="land">Land ({ filterLanden.length })</InputLabel>
                            <Select
                            native
                            value={reisplan.land}
                            onChange={handleChange}
                            inputProps={{
                                name: 'land',
                                id: 'land',
                            }}
                            >
                            <option aria-label="None" value="" ></option>
                            {filterLanden.map((land) => (
                                <option value={ land.name } >{ land.naam }</option>
                            ))}
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
                        <Button 
                            variant="contained" className={ classes.button }
                            onClick={handleModalClose}>
                            Annuleren
                        </Button>
                        { reisplanID !== 0 &&
                            <Button 
                                variant="contained" className={ classes.button } color="secondary"
                                onClick={verwijderReisplan}>
                                Verwijderen
                            </Button>
                        }
                        <Button 
                            variant="contained" className={ classes.button } color="primary"
                            onClick={opslaanReisplan}>
                            Opslaan
                        </Button>
                    </Grid>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        { melding }
                    </div>
                </div>

            </div>
        </Modal>

        </>
    );
}

export default UpdateReisplan;
