import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <Typography variant="body1" color="inherit" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    © 2024 | My Remix App
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
