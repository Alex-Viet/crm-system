import React, { useEffect } from 'react';
import { fetchComments, fetchDesigners, fetchIssues } from '../../api/api';

export const HomePage: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const commentsData = await fetchComments();
      console.log(commentsData);

      const designersData = await fetchDesigners();
      console.log(designersData);

      const issuesData = await fetchIssues();
      console.log(issuesData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};
