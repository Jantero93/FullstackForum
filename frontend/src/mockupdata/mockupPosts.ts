import { Post } from '../types/forum';

import moment from 'moment';

export const javaObject: Post[] = [
  {
    boardRef: 'boardId',
    created: moment('20/1/2021').toISOString(),
    id: '12',
    message: 'Gotta loew object',
    topicRef: '0',
    userRef: '0',
    votes: 5
  },
  {
    boardRef: 'boardId',
    created: moment('22/1/2021').toISOString(),
    id: '12',
    message: 'Gotta loew object',
    topicRef: '0',
    userRef: '0',
    votes: 5
  },
  {
    boardRef: 'boardId',
    created: moment('24/1/2021').toISOString(),
    id: '12',
    message: 'Gotta loew object',
    topicRef: '0',
    userRef: '0',
    votes: 5
  }
];
