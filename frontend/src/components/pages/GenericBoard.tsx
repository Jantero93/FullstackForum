import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** UI */
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Utils */
import { formatDate } from '../../utils/date';
import TopicService from '../../services/topicService';

/** Types */
import { Topic } from '../../types/forum';

/**
 * This component forwards to /:forumPage/:topicId via Router
 * Topic component is in /forumitems/Topic
 */
const GenericBoard: React.FC = (): JSX.Element => {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  const { forumPage } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TopicService.getAllTopicsByBoardId(forumPage as string).then((response) =>
      setTopics(response)
    );
  }, [forumPage]);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {topics.map((topic) => (
        <Card
          sx={{ minWidth: 275 }}
          key={topic.topicId}
          style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
        >
          <CardActionArea onClick={() => navigate(topic.topicId.toString())}>
            <CardContent>
              <Typography variant={'h5'} sx={{ mb: 1.5 }}>
                {topic.topic}
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
  );
};

export default GenericBoard;
