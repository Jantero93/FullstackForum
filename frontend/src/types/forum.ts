export type Board = {
  boardId: string;
  board: string;
  adjective: string;
};

/**
 * @type {created} ISO string
 * @type {boardsRef} parent Board Id
 * @type {userRef} parent User Id
 */
export type Post = {
  postId?: string;
  created: string;
  message: string;
  topicRef: string;
  votes: number;
  userRef: string;
};

/**
 * @type {created} ISO string
 * @type {boardsRef} parent Board Id
 * @type {userRef} parent User Id
 */
export type Topic = {
  id?: string;
  created: string;
  topicName: string;
  boardRef: string;
  userRef: string;
};

export type User = {
  userId: string;
  user: string;
  password: string;
};
