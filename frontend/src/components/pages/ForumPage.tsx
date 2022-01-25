import React from 'react';
import { useParams } from 'react-router-dom';

/** Pages */
import CatPage from './CatPage';
import CPage from './CPage';
import JavaPage from './JavaPage';
import MiscPage from './MiscPage';
import TypeScriptPage from './TypeScriptPage';

/** Board names string */
import { boards } from '../../types/boards';

/** Utils */
import { boardNameToUrlParameter } from '../../utils/routerUtils';

const ForumPage = (): JSX.Element => {
  const urlParams = useParams();

  const forumPages: JSX.Element[] = [
    <CPage key={boards[0].name} />,
    <JavaPage key={boards[1].name} />,
    <TypeScriptPage key={boards[2].name} />,
    <CatPage key={boards[3].name} />,
    <MiscPage key={boards[4].name} />
  ];

  /**
   * @param urlParam URL parameter from browser
   * @returns Corresponding React element
   */
  const renderForumPage = (urlParam: string): JSX.Element =>
    forumPages[
      boards.findIndex(
        (board) => boardNameToUrlParameter(board.name) === urlParam
      )
    ];

  return renderForumPage(urlParams.forumPage as string) || null;
};

export default ForumPage;
