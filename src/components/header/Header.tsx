import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../../hooks/useThemeContext';
import { getWorkWeekNumber } from '../../utils/weekNumber';

const Header: React.FC = () => {
  const [workWeekNumber, setWorkWeekNumber] = useState<number>(0);

  const { toggleTheme, theme } = useThemeContext();
  const currentTheme = theme.palette.mode;

  const handleThemeChange = () => {
    toggleTheme();
  };

  useEffect(() => {
    const updateWeekNumber = () => {
      const currentDate = new Date();
      const weekNumber = getWorkWeekNumber(currentDate);
      setWorkWeekNumber(weekNumber);
    };

    updateWeekNumber();

    const intervalId = setInterval(updateWeekNumber, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5">CRM System</Typography>
        <Typography variant="h5">
          Work Week: {workWeekNumber ? workWeekNumber : ''}
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
