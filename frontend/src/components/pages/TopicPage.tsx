import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Components */
import Post from '../forumItems/Post';
import PostForm from '../forumItems/PostForm';

/** Types */
import { Post as PostType } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  console.log('posts', posts);

  const { topicId } = useParams();

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
    PostService.deletePost(postId).then((response) => {
      setPosts(
        posts
          .map((post) => (post.id! === response.id! ? response : post))
          .sort(
            (a, b) =>
              new Date(a.created!).getTime() - new Date(b.created!).getTime()
          )
      );
    });
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

          <PostForm
            message={message}
            sendPostClicked={sendPostClicked}
            setMessage={setMessage}
          />
        </>
      )}
    </div>
  );
};

export default Topic;
