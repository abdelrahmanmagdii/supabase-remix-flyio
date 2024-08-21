import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from '@remix-run/react';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Your App Name
                </Typography>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/daily-message">Daily Message</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;