import React from 'react';
import { useParams } from 'react-router-dom';

const Topic: React.FC = (): JSX.Element => {
  const urlParams = useParams();

  return (
    <div>
      <p>Topic {urlParams.id}</p>
    </div>
  );
};

export default Topic;
