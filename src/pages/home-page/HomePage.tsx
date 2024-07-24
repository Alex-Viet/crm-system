import React from 'react';
import { CommentsCard } from '../../components/cards/CommentsCard';
import { TopDesignersCard } from '../../components/cards/TopDesignersCard';
import { Box, Container, Grid } from '@mui/material';
import { scrollbarStyles } from '../../styles/scrollbarStyles';

export const HomePage: React.FC = () => {
  return (
    <Container sx={{ padding: '2rem 0' }}>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Box sx={scrollbarStyles}>
            <TopDesignersCard />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={scrollbarStyles}>
            <CommentsCard />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
