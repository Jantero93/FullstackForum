import React from 'react';
import { useParams } from 'react-router-dom';

/** Pages */
import GenericPage from './GenericBoard';

const ForumPage = (): JSX.Element => {
  const urlParams = useParams();

  return <GenericPage boardId={urlParams.forumPage as string} />;
};

export default ForumPage;
