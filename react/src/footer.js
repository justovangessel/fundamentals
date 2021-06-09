import React from 'react';

// Material-UI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {

const classes = useStyles();

const templateProps = {
    footer: {
    copyright: "© Palmboom",
    year: new Date().getFullYear()
    },
};

return (
    <footer className={classes.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
            { templateProps.footer.copyright } { templateProps.footer.year }
        </Typography>
    </footer>
    )
}

export default Header;