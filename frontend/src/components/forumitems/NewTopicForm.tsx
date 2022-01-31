import React, { SetStateAction } from 'react';

/** UI */
import { Button, Stack, TextField, Typography } from '@mui/material';

/** Types */
import CSS from 'csstype';

const textAreaMargin = '0.25em';
const textAreaStyles: CSS.Properties = {
  backgroundColor: 'white',
  border: '1px solid black',
  borderRadius: '10px'
};

type Props = {
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  topicName: string;
  setTopicName: React.Dispatch<SetStateAction<string>>;
  postNewTopic: () => void;
};

const NewTopicForm: React.FC<Props> = ({
  message,
  setMessage,
  topicName,
  setTopicName,
  postNewTopic
}: Props): JSX.Element => {
  return (
    <Stack
      alignItems="flex-start"
      direction="column"
      justifyContent="flex-start"
      spacing={0.5}
      style={{ margin: '1.5em' }}
    >
      <Typography style={{ color: 'whitesmoke', marginLeft: textAreaMargin }}>
        Topic
      </Typography>
      <TextField
        fullWidth
        maxRows={1}
        minRows={1}
        multiline
        placeholder="Topic"
        value={topicName}
        style={textAreaStyles}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTopicName(e.target.value)
        }
      />
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
      <Button
        size="large"
        variant="contained"
        style={{ marginLeft: textAreaMargin, marginTop: '1em' }}
        onClick={() => postNewTopic()}
      >
        Post
      </Button>
    </Stack>
  );
};

export default NewTopicForm;
