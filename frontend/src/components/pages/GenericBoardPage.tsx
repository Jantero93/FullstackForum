/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/** Components */
import NewTopicForm from '../forumItems/NewTopicForm';
import Topic from '../forumItems/Topic';

/** UI */
import { Button, Stack } from '@mui/material';

/** Utils */
import PostService from '../../services/postService';
import TopicService from '../../services/topicService';

/** Hooks */
import { useUser } from '../../contexts/UserContext';
import { useToastUpdate } from '../../contexts/ToastContext';

/** Types */
import { Topic as TopicType } from '../../types/forum';

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
  const showToast = useToastUpdate();

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
      topicId: createdTopic.id!
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
      .catch(() => showToast({ message: 'Failed delete topic', error: true }));
  };

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
    </div>
  );
};

export default GenericBoard;
