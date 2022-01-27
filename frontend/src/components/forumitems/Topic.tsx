import React, { useEffect } from 'react';

/** Components */
import AnswerBox from './AnswerBox';
import Post from './Post';

/** Types */
import { Post as PostType } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [message, setMessage] = React.useState<string>('');

  useEffect(() => {
    PostService.getPostsByBoardId('boardId').then((response) =>
      setPosts(response.posts)
    );
  }, []);

  // TODO: On new post create service utils
  const sendPostClicked = (): void => console.log(`Post send: ${message}`);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {posts.length && (
        <AnswerBox
          message={message}
          sendPostClicked={sendPostClicked}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default Topic;
