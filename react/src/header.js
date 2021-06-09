import React from 'react';

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import World from '@material-ui/icons/Public';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header() {

const [value, setValue] = React.useState(0);

const templateProps = {
    header: {
    title: "Palmboom"
    },
};

const handleChange = (event, newValue) => {
    setValue(newValue);
};

return (    
    <header>
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6">
                    { templateProps.header.title }
                </Typography>
            </Toolbar>
            <Paper>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                backgroundcolor="Secondary"
                centered
            >
            <Tab label="Mijn reizen" icon={<HomeIcon />} />
            <Tab label="Reisplan" icon={<World />} />
        </Tabs>
        </Paper>
        </AppBar>
    </header>
    )

}

export default Header;