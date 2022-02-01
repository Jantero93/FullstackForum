import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Components */
import AnswerBox from '../forumItems/NewPostForm';
import Post from '../forumItems/Post';

/** Types */
import { Post as PostType } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';
import { formatISOdate } from '../../utils/date';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [message, setMessage] = React.useState<string>('');

  const { topicId } = useParams();

  /** Fetch all posts from topic */
  useEffect(() => {
    PostService.getPostsByTopicId(topicId as string).then((response) =>
      setPosts(response)
    );
  }, [topicId]);

  const sendPostClicked = async (): Promise<void> => {
    const newPost: PostType = {
      created: formatISOdate(),
      message: message,
      votes: 0,
      topicRef: topicId as string,
      userRef: '-1'
    };

    const postFromServer: PostType = await PostService.postNewPost(newPost);
    setPosts(posts.concat(postFromServer));
    setMessage('');
  };

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}

      <AnswerBox
        message={message}
        sendPostClicked={sendPostClicked}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Topic;
