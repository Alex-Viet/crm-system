import React from 'react';
import { CommentsCard } from '../../components/cards/CommentsCard';
import { TopDesignersCard } from '../../components/cards/TopDesignersCard';

export const HomePage: React.FC = () => {
  return (
    <div>
      <section>
        <TopDesignersCard />
      </section>
      <section>
        <CommentsCard />
      </section>
    </div>
  );
};
