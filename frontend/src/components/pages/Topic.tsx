import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Components */
import AnswerBox from '../forumItems/NewPostForm';
import Post from '../forumItems/Post';

/** Types */
import { Post as PostType } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

  return (
    <div>
      {!isLoading && (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}

          <AnswerBox
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
