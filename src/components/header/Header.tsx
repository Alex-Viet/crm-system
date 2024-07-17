import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../../hooks/useThemeContext';

const Header: React.FC = () => {
  const { toggleTheme, theme } = useThemeContext();
  const currentTheme = theme.palette.mode;

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          CRM System
        </Typography>
        <Switch
          checked={currentTheme === 'dark'}
          onChange={handleThemeChange}
          icon={<Brightness7Icon sx={{ fontSize: '1.3rem' }} />}
          checkedIcon={<Brightness4Icon sx={{ fontSize: '1.3rem' }} />}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
