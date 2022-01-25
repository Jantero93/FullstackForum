import moment from 'moment';
import { Topic } from '../types/forum';

export const javaTopics: Topic[] = [
  {
    boardRef: 'boardId',
    created: moment().subtract(3, 'd').toISOString(),
    id: '1',
    posts: [],
    topic: 'How object is the greatest object',
    userRef: 'userId'
  },
  {
    boardRef: 'boardId',
    created: moment().subtract(5, 'd').toISOString(),
    id: '2',
    posts: [],
    topic: 'I dont like Java',
    userRef: 'userId'
  },
  {
    boardRef: 'boardId',
    created: moment().subtract(7, 'd').toISOString(),
    id: '3',
    posts: [],
    topic: 'Java is da best OOP',
    userRef: 'userId'
  }
];
