import React from 'react';

import { Typography } from '@mui/material';

type Props = {
  header: string;
};

/** Alternative ok color for header #66b2ff */
const ForumHeader: React.FC<Props> = ({ header }: Props): JSX.Element => (
  <Typography
    id="main-page-header"
    align="center"
    variant={'h3'}
    style={{ color: 'whitesmoke' }}
  >
    {header}
  </Typography>
);

export default ForumHeader;
