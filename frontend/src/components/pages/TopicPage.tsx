import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Components */
import Post from '../forumItems/Post';
import PostForm from '../forumItems/PostForm';

/** Types */
import { Post as PostType } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';
import { useToastUpdate } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { topicId } = useParams();
  const { loggedIn } = useUser();
  const toastUpdate = useToastUpdate();

  /** Fetch all posts from topic */
  useEffect(() => {
    PostService.getPostsByTopicId(topicId as string).then((response) => {
      setPosts(response);
      setIsLoading(false);
    });
  }, [topicId]);

  const sendPostClicked = async (): Promise<void> => {
    const newPost: PostType = {
      message: message,
      topicId: topicId as string
    };

    const savedPost: PostType = await PostService.postNewPost(newPost);
    setPosts(posts.concat(savedPost));

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
      .catch(() => toastUpdate({ error: true, message: 'Failed delete post' }));
  };

  return (
    <div>
      {!isLoading && (
        <>
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
              sendPostClicked={sendPostClicked}
              setMessage={setMessage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Topic;
