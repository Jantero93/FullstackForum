import React from 'react';

/** Components */
import Post from './Post';

/** Mockup Data (Posts) */
import { javaObjectPosts } from '../../mockupdata/mockupPosts';

const Topic: React.FC = (): JSX.Element => {
  return (
    <div>
      {javaObjectPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Topic;
