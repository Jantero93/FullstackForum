import { Post } from '../types/forum';

import moment from 'moment';

export const javaObjectPosts: Post[] = [
  {
    boardRef: 'boardId',
    created: moment().subtract(3, 'd').toISOString(),
    id: '12',
    message: 'Object id Da OBJECT',
    topicRef: '0',
    userRef: '0',
    votes: 5
  },
  {
    boardRef: 'boardId',
    created: moment().subtract(2, 'd').toISOString(),
    id: '15',
    message: 'I hate java, it suck balls',
    topicRef: '0',
    userRef: '0',
    votes: 5
  },
  {
    boardRef: 'boardId',
    created: moment().subtract(1, 'd').toISOString(),
    id: '16',
    message: 'Im a java programmer but I prefer C++',
    topicRef: '0',
    userRef: '0',
    votes: 5
  }
];
