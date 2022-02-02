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
  id?: string;
  created?: string;
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
  created?: string;
  topicName: string;
  boardRef: string;
  userRef: string;
};

export type User = {
  id?: string;
  username: string;
  password: string;
};
