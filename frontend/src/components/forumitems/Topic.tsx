/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** UI */
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

/** Utils */
import { formatDate } from '../../utils/date';

/** Hooks */
import { useUser } from '../../contexts/UserContext';

/** Types */
import { Topic as TopicType } from '../../types/forum';

type Props = {
  topic: TopicType;
  deleteTopicClicked: (e: React.MouseEvent<unknown>, topicId: string) => void;
};

const Topic: React.FC<Props> = ({
  topic,
  deleteTopicClicked
}: Props): JSX.Element => {
  const user = useUser();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Card
        sx={{ minWidth: 275 }}
        key={topic.id}
        style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
      >
        <CardActionArea onClick={() => navigate(topic!.id!.toString())}>
          <CardContent>
            <Typography variant={'h4'} sx={{ mb: 1.5 }}>
              {topic.topicName}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              spacing={4}
            >
              <Typography variant="h6" color="text.primary">
                {topic!.user!.username}
              </Typography>
              {user.loggedIn && user!.id === topic!.user!.id && (
                <DeleteIcon
                  fontSize={'large'}
                  onClick={(e: React.MouseEvent<unknown>) =>
                    deleteTopicClicked(e, topic.id!)
                  }
                />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {`${formatDate('DD.MM.YYYY', topic.created)} klo ${formatDate(
                'HH:mm',
                topic.created
              )}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

export default Topic;
