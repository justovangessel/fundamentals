import React, { useEffect } from "react";
// Material-UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CreateReisplan from "./CreateReisplan";
import UpdateReisplan from "./UpdateReisplan";

function Reisplannen(props) {

    const useStyles = makeStyles((theme) => ({
            heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
            heroButtons: {
            marginTop: theme.spacing(4),
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();
    
    useEffect(() => {
        props.getReisplannen();
    }, []);

    return (
        <>
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Where do you want to go today?
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Stel je reis samen aan de hand van hotels, vlucht of huurauto.
            </Typography>
            <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <CreateReisplan
                        singleReisplan={props.singleReisplan}
                        createReisplan={props.createReisplan}
                        handleChange={props.handleChange}
                    />
                </Grid>
            </Grid>
            </div>
        </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">

        <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
            Mijn reisplannen
        </Typography>

        <Grid container spacing={4}>
            {props.alldata.map((holiday) => (
            <Grid item key={holiday.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={`https://source.unsplash.com/featured/?vacation,`+holiday.land}
                    title={holiday.naam}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {holiday.naam} ({ holiday.land })
                    </Typography>
                    <Typography>
                        {holiday.omschrijving}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                    Bekijk
                    </Button>
                    <UpdateReisplan
                        reisplanId={holiday.id}
                        singleReisplan={props.singleReisplan}
                        getReisplan={props.getReisplan}
                        updateReisplan={props.updateReisplan}
                        deleteReisplan={props.deleteReisplan}
                        handleChange={props.handleChange}>
                    </UpdateReisplan>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Container>
    </>
    );
}

export default Reisplannen;