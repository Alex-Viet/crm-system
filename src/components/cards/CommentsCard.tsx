import React, { useEffect, useState } from 'react';
import { fetchCommentsThunk } from '../../slices/commentsSlice';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Link,
} from '@mui/material';
import { truncateText } from '../../utils/trancText';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const CommentsCard: React.FC = () => {
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

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

  const toggleExpand = (id: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getRelativeTime = (dateString: string) => {
    return formatDistanceToNow(parseISO(dateString), {
      addSuffix: true,
      locale: ru,
    });
  };

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
      {lastComments.map((comment) => {
        const isExpanded = expandedComments[comment.id];
        return (
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
                  <Typography variant="body2">
                    {comment.date_created &&
                      getRelativeTime(comment.date_created)}
                  </Typography>
                  <Typography variant="body2" sx={{ marginY: '0.5rem' }}>
                    Задача: {comment.issue}
                  </Typography>
                  <Typography variant="body2">
                    {isExpanded
                      ? comment.message
                      : comment.message && truncateText(comment.message, 200)}
                    {comment.message && comment.message.length > 200 && (
                      <Link
                        component="button"
                        variant="body2"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 'bold',
                          marginLeft: '0.5rem',
                        }}
                        onClick={() => toggleExpand(comment.id)}
                      >
                        {isExpanded ? 'Скрыть' : 'Развернуть'}
                      </Link>
                    )}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
