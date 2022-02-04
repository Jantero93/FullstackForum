export type Board = {
  boardId?: string;
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
  created?: string;
  message: string;
  topicId: string;
  votes: number;
  userId: string;
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
  userId: string;
};

export type User = {
  id?: string;
  username: string;
  password: string;
};
