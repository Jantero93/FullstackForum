import React, { useEffect } from 'react';

/** Components */
import Post from './Post';

/** Types */
import { Post as PostType } from '../../types/forum';

/** Utils */
import PostService from '../../services/postService';

const Topic: React.FC = (): JSX.Element => {
  const [posts, setPosts] = React.useState<PostType[]>([]);

  useEffect(() => {
    PostService.getPostsByBoardId('boardId').then((response) =>
      setPosts(response.posts)
    );
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Topic;
