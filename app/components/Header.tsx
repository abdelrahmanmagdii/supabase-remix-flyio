import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from '@remix-run/react';

const Header: React.FC = () => {
    console.log("Header component rendered");
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Remix App
                </Typography>
                <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
        </AppBar>
    );
};


export default Header;
