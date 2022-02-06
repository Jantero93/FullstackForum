import React from 'react';

/** UI */
import { Card, CardContent, Stack, Typography } from '@mui/material';

/** Types */
import { Post as PostType } from '../../types/forum';
import { formatDate } from '../../utils/date';

import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  post: PostType;
  deletePostClicked: (id: string) => void;
};

const Post: React.FC<Props> = ({
  post,
  deletePostClicked
}: Props): JSX.Element => {
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
              {`${post.user?.username} ${formatDate(
                'DD.MM.YYYY',
                post.created
              )} klo ${formatDate('HH:mm', post.created)}`}
            </Typography>
            <DeleteIcon
              fontSize={'large'}
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => deletePostClicked(post.id!)}
            />
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
