import React, { useEffect } from 'react';
import { Card, CardContent, Avatar, Typography } from '@mui/material';
import { CommentsData } from '../../slices/commentsSlice';
import { fetchCommentsThunk } from '../../slices/commentsSlice';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

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
    <>
      <Card>
        <Typography variant="h4" sx={{ padding: '2rem 0.5rem' }}>
          Последние комментарии
        </Typography>
      </Card>
      {lastComments.map((comment: CommentsData) => (
        <Card key={comment.id}>
          <CardContent>
            <Avatar
              src={comment.designer.avatar ? comment.designer.avatar : ''}
              alt={comment.designer.username}
            />
            <Typography variant="h6">{comment.designer.username}</Typography>
            <Typography variant="body2">{comment.date_created}</Typography>
            <Typography variant="body2">{comment.issue}</Typography>
            <Typography variant="body2">{comment.message}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
