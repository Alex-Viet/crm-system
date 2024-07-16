import React from 'react';
import { HomePage } from '../pages/home-page/HomePage';
import { Route, Routes } from 'react-router-dom';
import { TasksPage } from '../pages/tasks-page/TasksPage';
import { DesignersPage } from '../pages/designers-page/DesignersPage';
import { NotFoundPage } from '../pages/404-page/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/designers" element={<DesignersPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
