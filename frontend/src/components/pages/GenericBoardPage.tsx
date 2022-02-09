/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** Components */
import ForumHeader from '../forumItems/ForumHeader';
import NewTopicForm from '../forumItems/NewTopicForm';
import Topic from '../forumItems/Topic';

/** UI */
import { Button, Container, Stack } from '@mui/material';

/** Utils */
import PostService from '../../services/postService';
import TopicService from '../../services/topicService';

/** Hooks */
import { useUpdateUser, useUser } from '../../contexts/UserContext';
import { useToastUpdate } from '../../contexts/ToastContext';

/** Types */
import { Topic as TopicType } from '../../types/forum';
import { AxiosError } from 'axios';

/**
 * This component forwards to /:boardName/:topicId via Router
 * Topic component is in /:boardName/Topic
 */
const GenericBoard: React.FC = (): JSX.Element => {
  const [topics, setTopics] = React.useState<TopicType[]>([]);
  const [toggleNewTopicForm, setToggleNewTopicForm] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  /** For new topic form */
  const [message, setMessage] = React.useState<string>('');
  const [topicName, setTopicName] = React.useState<string>('');

  /** Hooks */
  const { boardName } = useParams();
  const { loggedIn } = useUser();
  const updateUser = useUpdateUser();
  const showToast = useToastUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    TopicService.getAllTopicsByBoardName(boardName as string)
      .then((response) => setTopics(response))
      .catch((e) =>
        showToast({ error: true, message: (e as AxiosError).response!.data })
      )
      .finally(() => setIsLoading(false));
  }, [boardName]);

  const postNewTopic = async (): Promise<void> => {
    TopicService.postTopic({
      boardName: boardName as string,
      topicName: topicName,
      posts: []
    })
      .then((createdTopic) => {
        setTopics(topics.concat(createdTopic));
        PostService.postNewPost({
          message: message,
          topicId: createdTopic.id!
        });
        setTopicName('');
        setMessage('');
        setToggleNewTopicForm(false);
      })
      .catch((e) => {
        showToast({ message: (e as AxiosError).response?.data, error: true });
        if ((e as AxiosError).response?.status === 401) {
          updateUser({ loggedIn: false, id: undefined, role: 'normal' });
          navigate('/');
        }
      });
  };

  const deleteTopicClicked = (
    e: React.MouseEvent<unknown>,
    topicId: string
  ): void => {
    e.stopPropagation();
    e.preventDefault();
    TopicService.deleteTopic(topicId)
      .then((response) => {
        showToast({ message: 'Deleted topic successfully', error: false });
        setTopics(topics.filter((topic) => topic.id! !== topicId));
      })
      .catch((e) =>
        showToast({ message: (e as AxiosError).response!.data, error: true })
      );
  };

  return (
    <Container disableGutters maxWidth={'xl'}>
      {!isLoading && (
        <>
          <ForumHeader header={boardName!} />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            {topics.map((topic) => (
              <Topic
                topic={topic}
                deleteTopicClicked={deleteTopicClicked}
                key={topic.id}
              />
            ))}
          </Stack>

          {loggedIn && (
            <Button
              size={'large'}
              variant={'contained'}
              style={{ margin: '1em' }}
              onClick={() => setToggleNewTopicForm(!toggleNewTopicForm)}
            >
              {toggleNewTopicForm ? 'Hide' : 'New Topic'}
            </Button>
          )}
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
    </Container>
  );
};

export default GenericBoard;
