import React from 'react';
import { useNavigate } from 'react-router-dom';

/** UI */
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
          <Typography variant={'h5'} sx={{ mb: 1.5 }}>
            {topic.topicName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {topic.userId}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>ddd</Typography>
            <DeleteIcon fontSize="large" />
          </div>
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
