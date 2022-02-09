/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** Components */
import ForumHeader from '../forumItems/ForumHeader';
import Post from '../forumItems/Post';
import PostForm from '../forumItems/PostForm';

/** UI */
import { Container } from '@mui/material';

/** Utils */
import PostService from '../../services/postService';

/** Hooks */
import { useToastUpdate } from '../../contexts/ToastContext';
import { useUpdateUser, useUser } from '../../contexts/UserContext';

/** Types */
import { Post as PostType } from '../../types/forum';
import { AxiosError } from 'axios';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [topicName, setTopicName] = React.useState<string>('');
  const [topicUserId, setTopicUserId] = React.useState<string>('');

  const { topicId } = useParams();
  const { loggedIn } = useUser();
  const updateUser = useUpdateUser();
  const showToast = useToastUpdate();
  const navigate = useNavigate();

  /** Fetch all posts from topic */
  useEffect(() => {
    PostService.getTopicWithPostsAndUsers(topicId as string)
      .then((response) => {
        setPosts(response.posts);
        setTopicName(response.topicName);
        setTopicUserId(response?.user?.id || '');
        setIsLoading(false);
      })
      .catch((e) =>
        showToast({ message: (e as AxiosError).response!.data, error: true })
      )
      .finally(() => setIsLoading(false));
  }, [topicId]);

  const sendPostClicked = async (): Promise<void> => {
    const newPost: PostType = {
      message: message,
      topicId: topicId as string
    };

    try {
      const savedPost: PostType = await PostService.postNewPost(newPost);
      setPosts(posts.concat(savedPost));
    } catch (error) {
      showToast({ message: (error as AxiosError).response!.data, error: true });
      if ((error as AxiosError).response!.status === 401) {
        updateUser({ loggedIn: false, id: undefined, role: 'normal' });
        navigate('/')
      }
    }

    setMessage('');
  };

  const deletePostClicked = (postId: string): void => {
    PostService.deletePost(postId)
      .then((response) => {
        setPosts(
          posts
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .map((post) => (post.id! === response.id! ? response : post))
            .sort(
              (a, b) =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                new Date(a.created!).getTime() - new Date(b.created!).getTime()
            )
        );
      })
      .catch((e) =>
        showToast({ error: true, message: (e as AxiosError).response!.data })
      );
  };

  return (
    <Container disableGutters maxWidth={'xl'}>
      {!isLoading && (
        <>
          <ForumHeader header={topicName} />
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              deletePostClicked={deletePostClicked}
            />
          ))}
          {loggedIn && (
            <PostForm
              message={message}
              topicUserId={topicUserId}
              sendPostClicked={sendPostClicked}
              setMessage={setMessage}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Topic;
