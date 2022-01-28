import moment from 'moment';
import { Topic } from '../types/forum';

export const javaTopics: Topic[] = [
  {
    boardRef: 'boardId',
    created: moment().subtract(3, 'd').toISOString(),
    topicId: '1',
    topic: 'How object is the greatest object',
    userRef: 'userId'
  },
  {
    boardRef: 'boardId',
    created: moment().subtract(5, 'd').toISOString(),
    topicId: '2',
    topic: 'I dont like Java',
    userRef: 'userId'
  },
  {
    boardRef: 'boardId',
    created: moment().subtract(7, 'd').toISOString(),
    topicId: '3',
    topic: 'Java is da best OOP',
    userRef: 'userId'
  }
];
