/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { SetStateAction } from 'react';

/** Components */
import ManagePosts from './ManagePosts';

/** UI */
import {
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Delete } from '@mui/icons-material';

/** Utils */
import TopicService from '../../services/topicService';
import { useSetShowAdminLogin } from '../../contexts/AdminLoginContext';
import { useToastUpdate } from '../../contexts/ToastContext';

/** Types */
import { Board, Topic } from '../../types/forum';

type Props = {
  boardName: string;
  setSelectedBoard: React.Dispatch<SetStateAction<Board | undefined>>;
};

const ManageTopics: React.FC<Props> = ({
  boardName,
  setSelectedBoard
}: Props): JSX.Element => {
  const [selectedTopic, setSelectedTopic] = React.useState<Topic | undefined>(
    undefined
  );
  const [topics, setTopics] = React.useState<Topic[]>([]);

  const showToast = useToastUpdate();
  const setShowAdminLogin = useSetShowAdminLogin();

  React.useEffect(() => {
    TopicService.getAllTopicsByBoardName(boardName)
      .then((response) => setTopics(response))
      .catch(() => {
        showToast({ message: 'Token expired, login again', error: true });
        setShowAdminLogin(true);
      });
  }, [boardName]);

  const deleteTopicClicked = (topicId: string) => {
    TopicService.deleteTopic(topicId)
      .then(() => setTopics(topics.filter((topic) => topicId !== topic.id!)))
      .catch(() => {
        showToast({ message: 'Token expired, login again', error: true });
        setShowAdminLogin(true);
      });
  };

  const topicClicked = (topic: Topic) => setSelectedTopic(topic);

  return (
    <>
      {selectedTopic ? (
        <ManagePosts
          topicId={selectedTopic.id!}
          setSelectedTopic={setSelectedTopic}
        />
      ) : (
        <>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            style={{ margin: '0.5em' }}
            onClick={() => setSelectedBoard(undefined)}
          >
            Boards
          </Button>
          {topics.map((topic) => (
            <ListItem
              key={topic.id!}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTopicClicked(topic.id!)}
                >
                  <Delete fontSize={'large'} htmlColor={'#000000'} />
                </IconButton>
              }
              style={{
                backgroundColor: 'whitesmoke',
                borderBottom: '1px solid black',
                cursor: 'pointer'
              }}
              onClick={() => topicClicked(topic)}
            >
              <ListItemAvatar></ListItemAvatar>
              <ListItemText
                primary={topic.topicName}
                secondary={topic.user!.username}
              />
            </ListItem>
          ))}
        </>
      )}
    </>
  );
};

export default ManageTopics;
