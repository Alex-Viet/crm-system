import React, { useEffect } from 'react';
import { fetchCommentsThunk } from '../../slices/commentsSlice';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

export const CommentsCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: comments,
    error,
    status,
  } = useAppSelector((state: RootState) => state.comments);

  const lastComments = comments.slice(0, 10);

  useEffect(() => {
    dispatch(fetchCommentsThunk());
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

  return (
    <Box>
      <Card sx={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h4">Последние комментарии</Typography>
        </CardContent>
      </Card>
      {lastComments.map((comment) => (
        <Card key={comment.id} sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={comment.designer.avatar ? comment.designer.avatar : ''}
                alt={comment.designer.username}
              />
              <Box sx={{ marginLeft: '1rem' }}>
                <Typography variant="h6">
                  {comment.designer.username}
                </Typography>
                <Typography variant="body2">{comment.date_created}</Typography>
                <Typography variant="body2">{comment.issue}</Typography>
                <Typography variant="body2">{comment.message}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
