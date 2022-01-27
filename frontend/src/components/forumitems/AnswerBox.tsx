import React, { SetStateAction } from 'react';

/** UI */
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';

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
  return (
    <Stack
      alignItems="flex-start"
      direction="column"
      justifyContent="flex-start"
      spacing={0.5}
      style={{ margin: '1.5em' }}
    >
      <Typography style={{ color: 'whitesmoke', marginLeft: '0.25em' }}>
        Send a post
      </Typography>
      <TextField
        fullWidth
        maxRows={100}
        minRows={4}
        multiline
        placeholder="Message..."
        value={message}
        style={{
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: '10px'
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />
      <Button
        size="large"
        variant="contained"
        style={{ marginLeft: '0.25em', marginTop: '1em' }}
        onClick={() => sendPostClicked()}
      >
        Post
      </Button>
    </Stack>
  );
};

export default AnswerBox;
