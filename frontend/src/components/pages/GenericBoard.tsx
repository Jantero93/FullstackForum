/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** Components */
import NewTopicForm from '../forumItems/NewTopicForm';

/** UI */
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography
} from '@mui/material';

/** Utils */
import { formatDate } from '../../utils/date';
import PostService from '../../services/postService';
import TopicService from '../../services/topicService';

/** Types */
import { Topic } from '../../types/forum';

/**
 * This component forwards to /:boardName/:topicId via Router
 * Topic component is in /:boardName/Topic
 */
const GenericBoard: React.FC = (): JSX.Element => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [toggleNewTopicForm, setToggleNewTopicForm] =
    React.useState<boolean>(false);

  /** For new topic form */
  const [message, setMessage] = React.useState<string>('');
  const [topicName, setTopicName] = React.useState<string>('');

  const { boardName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TopicService.getAllTopicsByBoardName(boardName as string).then((response) =>
      setTopics(response)
    );
  }, [boardName]);

  const postNewTopic = async (): Promise<void> => {
    setTopicName('');
    setMessage('');
    setToggleNewTopicForm(false);

    const createdTopic = await TopicService.postTopic({
      boardRef: boardName as string,
      topicName: topicName,
      userRef: '-1'
    });

    setTopics(topics.concat(createdTopic));

    await PostService.postNewPost({
      message: message,
      topicRef: createdTopic.id as string,
      userRef: '-1',
      votes: 0
    });
  };

  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        {topics.map((topic) => (
          <Card
            sx={{ minWidth: 275 }}
            key={topic.id}
            style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
          >
            <CardActionArea onClick={() => navigate(topic.id!.toString())}>
              <CardContent>
                <Typography variant={'h5'} sx={{ mb: 1.5 }}>
                  {topic.topicName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {topic.userRef}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${formatDate('DD.MM.YYYY', topic.created)} klo ${formatDate(
                    'HH:mm',
                    topic.created
                  )}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      <Button
        size={'large'}
        variant={'contained'}
        style={{ margin: '1em' }}
        onClick={() => setToggleNewTopicForm(!toggleNewTopicForm)}
      >
        {toggleNewTopicForm ? 'Hide' : 'New Topic'}
      </Button>
      {toggleNewTopicForm && (
        <NewTopicForm
          message={message}
          setMessage={setMessage}
          topicName={topicName}
          setTopicName={setTopicName}
          postNewTopic={postNewTopic}
        />
      )}
    </div>
  );
};

export default GenericBoard;
