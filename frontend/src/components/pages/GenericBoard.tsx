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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  /** For new topic form */
  const [message, setMessage] = React.useState<string>('');
  const [topicName, setTopicName] = React.useState<string>('');

  const { boardName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TopicService.getAllTopicsByBoardName(boardName as string).then(
      (response) => {
        setTopics(response);
        setIsLoading(false);
      }
    );
  }, [boardName]);

  const postNewTopic = async (): Promise<void> => {
    setTopicName('');
    setMessage('');
    setToggleNewTopicForm(false);

    const createdTopic = await TopicService.postTopic({
      boardName: boardName as string,
      topicName: topicName,
      posts: []
    });

    setTopics(topics.concat(createdTopic));

    await PostService.postNewPost({
      message: message,
      topicId: createdTopic.id as string
    });
  };

  const renderTopics = (): JSX.Element[] =>
    topics.map((topic) => (
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
              {topic.userId}
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
    ));

  return (
    <div>
      {!isLoading && (
        <>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            {renderTopics()}
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
        </>
      )}
    </div>
  );
};

export default GenericBoard;
