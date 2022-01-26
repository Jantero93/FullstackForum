import React from 'react';
import { useParams } from 'react-router-dom';

/** Pages */
import GenericPage from './GenericBoard';

/** Utils */
import { boardNameToUrlParameter } from '../../utils/routerUtils';

const ForumPage = (): JSX.Element => {
  const urlParams = useParams();

  return (
    <GenericPage
      boardId={boardNameToUrlParameter(urlParams.forumPage as string)}
    />
  );
};

export default ForumPage;
