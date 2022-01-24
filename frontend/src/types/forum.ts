export type Board = {
  boardId: string;
  topics: Topic[];
}

/**
 * @type {created} ISO string
 * @type {boardsRef} parent Board Id
 * @type {userRef} parent User Id
 */
export type Post = {
  id: string;
  created: string;
  message: string;
  topicRef: string;
  votes: number;
  boardRef: string;
  userRef: string;
}

/**
 * @type {created} ISO string
 * @type {boardsRef} parent Board Id
 * @type {userRef} parent User Id
 */
export type Topic = {
  id: string;
  created: string;
  topic: string;
  posts: Post[];
  boardRef: string;
  userRef: string;
}

export type User = {
  id: string;
  user: string;
  password: string;
}
