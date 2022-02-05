import React, { SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/** UI */
import { Button, Stack, TextField, Typography } from '@mui/material';

/** Types */
import CSS from 'csstype';
import TopicService from '../../services/topicService';

const textAreaMargin = '0.25em';
const textAreaStyles: CSS.Properties = {
  backgroundColor: 'white',
  border: '1px solid black',
  borderRadius: '10px'
};

type Props = {
  message: string;
  sendPostClicked: () => void;
  setMessage: React.Dispatch<SetStateAction<string>>;
};

const AnswerBox: React.FC<Props> = ({
  message,
  sendPostClicked,
  setMessage
}: Props): JSX.Element => {
  const { boardName, topicId } = useParams();
  const navigate = useNavigate();

  const deleteTopicClicked = (): void => {
    TopicService.deleteTopic(topicId!).then(() => navigate(`/${boardName}`))
    
  };

  return (
    <Stack
      alignItems="flex-start"
      direction="column"
      justifyContent="flex-start"
      spacing={0.5}
      style={{ margin: '1.5em' }}
    >
      <Typography style={{ color: 'whitesmoke', marginLeft: textAreaMargin }}>
        Send a post
      </Typography>
      <TextField
        fullWidth
        maxRows={100}
        minRows={4}
        multiline
        placeholder="Message..."
        value={message}
        style={textAreaStyles}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={3}
      >
        <Button
          size={'large'}
          variant={'contained'}
          style={{ marginLeft: textAreaMargin, marginTop: '1em' }}
          onClick={() => sendPostClicked()}
        >
          Post
        </Button>
        <Button
          size="large"
          color={'error'}
          variant={'contained'}
          onClick={() => deleteTopicClicked()}
        >
          Delete topic
        </Button>
      </Stack>
    </Stack>
  );
};

export default AnswerBox;
