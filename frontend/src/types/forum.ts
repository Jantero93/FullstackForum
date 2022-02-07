export type Board = {
  id?: string;
  board: string;
  adjective: string;
};

/**
 * @type {created} ISO string
 * @type {boardsRef} parent Board Id
 * @type {userRef} parent User Id
 */
export type Post = {
  id?: string;
  message: string;
  created?: string;
  topicId: string;
  votes?: number;
  user?: User;
};

/**
 * @type {created} ISO string
 * @type {boardsRef} parent Board Id
 * @type {userRef} parent User Id
 */
export type Topic = {
  id?: string;
  created?: string;
  topicName: string;
  boardName: string;
  user?: User;
  posts: Post[];
};

export type User = {
  id?: string;
  username?: string;
};
