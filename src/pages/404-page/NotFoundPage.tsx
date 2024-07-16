import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <Link to="/">вернуться на главную</Link>
    </div>
  );
};
