import React, { useEffect } from 'react';
import { fetchAllDesignersThunk } from '../../slices/designersSlice';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { calculateMedian } from '../../utils/calcMedian';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

export const TopDesignersCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { designers, error, status } = useAppSelector(
    (state: RootState) => state.designers
  );

  useEffect(() => {
    dispatch(fetchAllDesignersThunk());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Typography variant="h4" sx={{ paddingLeft: '1rem', paddingTop: '2rem' }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h4"
        color="red"
        sx={{ paddingLeft: '1rem', paddingTop: '2rem' }}
      >
        {error}
      </Typography>
    );
  }

  const designersWithStats = designers.map((designer) => {
    const completedIssues = designer.issues.filter(
      (issue) => issue.status === 'Done'
    );

    const times = completedIssues.map((issue) => {
      const startTime = new Date(issue.date_started_by_designer).getTime();
      const endTime = new Date(issue.date_finished_by_designer).getTime();

      return endTime - startTime;
    });

    const medianTime = calculateMedian(times);

    return {
      ...designer,
      completedTasks: completedIssues.length,
      medianTime,
    };
  });

  const filteredDesigners = designersWithStats.filter(
    (designer) => !isNaN(designer.medianTime)
  );

  const sortedDesigners = filteredDesigners
    .sort((a, b) => {
      if (a.medianTime === b.medianTime) {
        return b.completedTasks - a.completedTasks;
      }

      return a.medianTime - b.medianTime;
    })
    .slice(0, 10);

  return (
    <Box>
      <Card sx={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h4">Топ 10 дизайнеров</Typography>
        </CardContent>
      </Card>
      {sortedDesigners.map((designer) => (
        <Card key={designer.username} sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={designer.avatar ? designer.avatar : ''}
                alt={designer.username}
              />
              <Box sx={{ marginLeft: '1rem' }}>
                <Typography variant="h6">{designer.username}</Typography>
                <Typography variant="body2">
                  Медианное время: {Math.floor(designer.medianTime / 1000 / 60)}{' '}
                  минут
                </Typography>
                <Typography variant="body2">
                  Выполненные задачи: {designer.completedTasks}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
