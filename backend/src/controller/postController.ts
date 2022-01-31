/** Repository */
import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/postRepository';

/** Types */
import { Response, Request } from 'express';
import { Post } from '../entity/Post';

export const getAllByTopicId = async (req: Request, res: Response) => {
  const postRepository = getCustomRepository(PostRepository);
  res.send(await postRepository.findPostsByTopicId(req.params.topicId));
};

export const postNewPost = async (req: Request, res: Response) => {
  const postRepository = getCustomRepository(PostRepository);

  const { postId, created, message, topicRef, votes, userRef } = req.body;

  const post = new Post();

  post.postId = postId;
  post.created = created;
  post.message = message;
  post.topicRef = topicRef;
  post.votes = votes;
  post.userRef = userRef;

  res.send(await postRepository.save(post));
};

/**
 * Expose service function to other controllers
 * @param post new post to save
 * @returns saved post
 */
export const serviceSavePost = async (post: Post) => {
  const postRepository = getCustomRepository(PostRepository);
  return await postRepository.save(post);
};
