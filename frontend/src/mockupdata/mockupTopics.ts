import moment from 'moment';
import { Topic } from '../types/forum';

export const javaTopics: Topic[] = [
  {
    boardRef: 'boardId',
    created: moment('2021/1/20').toISOString(),
    id: '1',
    posts: [],
    topic: 'How object is the greatest object',
    userRef: 'userId'
  },
  {
    boardRef: 'boardId',
    created: moment('2021/1/30').toISOString(),
    id: '2',
    posts: [],
    topic: 'I dont like Java',
    userRef: 'userId'
  },
  {
    boardRef: 'boardId',
    created: moment('2021/1/31').toISOString(),
    id: '3',
    posts: [],
    topic: 'Java is da best OOP',
    userRef: 'userId'
  }
];
