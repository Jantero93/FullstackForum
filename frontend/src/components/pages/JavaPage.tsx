import React from 'react';
import { useNavigate } from 'react-router-dom';

/** UI */
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Utils */
import { formatDate } from '../../utils/date';

/** Mockup Data */
import { javaTopics } from '../../mockupdata/mockupTopics';

const JavaPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
    >
      {/* Create topics from API/Mockup Data*/}
      {javaTopics.map((topic) => (
        <Card
          sx={{ minWidth: 275 }}
          key={topic.id}
          style={{ backgroundColor: 'whitesmoke', margin: '0.5em' }}
        >
          <CardActionArea onClick={() => navigate(topic.id)}>
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

export default JavaPage;
