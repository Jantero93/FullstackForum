import React from 'react';

/** UI */
import { Card, CardContent, Stack, Typography } from '@mui/material';

/** Types */
import { Post as PostType } from '../../types/forum';
import { formatDate } from '../../utils/date';

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }: Props): JSX.Element => {
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        <Card
          sx={{ minWidth: 275 }}
          key={post.message}
          style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
        >
          <CardContent>
            <Typography color="text.secondary">
              {post.user?.username}
            </Typography>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              {`${formatDate('DD.MM.YYYY', post.created)} klo ${formatDate(
                'HH:mm',
                post.created
              )}`}
            </Typography>
            <Typography variant="h6" style={{ wordWrap: 'break-word' }}>
              {post.message}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
};

export default Post;
