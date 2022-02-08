/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { SetStateAction } from 'react';

/** UI */
import {
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';

/** Types */
import { Post, Topic } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';
import { useToastUpdate } from '../../contexts/ToastContext';
import { useSetShowAdminLogin } from '../../contexts/AdminLoginContext';

interface Props {
  topicId: string;
  setSelectedTopic: React.Dispatch<SetStateAction<Topic | undefined>>;
}

const ManagePosts: React.FC<Props> = ({
  topicId,
  setSelectedTopic
}: Props): JSX.Element => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  const showToast = useToastUpdate();
  const setShowAdminLogin = useSetShowAdminLogin()

  React.useEffect(() => {
    PostService.getTopicWithPostsAndUsers(topicId).then((response) =>
      setPosts(response.posts)
    );
  }, [topicId]);

  const deletePostClicked = (postId: string) => {
    PostService.deletePost(postId)
      .then((response) =>
        setPosts(
          posts.map((post) => (response.id! === post.id! ? response : post))
        )
      )
      .catch(() => {
        showToast({ message: 'Token expired, login again', error: true });
        setShowAdminLogin(true)
      });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        style={{ margin: '0.5em' }}
        onClick={() => setSelectedTopic(undefined)}
      >
        Topics
      </Button>
      {posts.map((post) => (
        <ListItem
          key={post.id!}
          divider
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deletePostClicked(post.id!)}
            >
              <Delete fontSize={'large'} htmlColor={'#000000'} />
            </IconButton>
          }
          style={{
            backgroundColor: 'whitesmoke',
            borderBottom: '1px solid black',
          }}
        >
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={post.message}
            secondary={post.user!.username}
          />
        </ListItem>
      ))}
    </>
  );
};

export default ManagePosts;
