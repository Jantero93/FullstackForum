import React from 'react';
import { useNavigate } from 'react-router-dom';

/** UI */
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

/** Utils */
import { formatDate } from '../../utils/date';

/** Types */
import { Topic as TopicType } from '../../types/forum';

type Props = {
  topic: TopicType;
};

const Topic: React.FC<Props> = ({ topic }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ minWidth: 275 }}
      key={topic.id}
      style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
    >
      <CardActionArea onClick={() => navigate(topic.id!.toString())}>
        <CardContent>
          <Typography variant={'h4'} sx={{ mb: 1.5 }}>
            {topic.topicName}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {topic!.user!.username}
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
  );
};

export default Topic;
