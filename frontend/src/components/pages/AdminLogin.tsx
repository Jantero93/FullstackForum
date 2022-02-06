import React from 'react';

import { Stack, Typography, TextField, Button } from '@mui/material';

import CSS from 'csstype';

const textAreaStyles: CSS.Properties = {
  backgroundColor: 'white',
  border: '1px solid black'
};

const AdminLogin: React.FC = (): JSX.Element => {
  const [password, setPassword] = React.useState<string>('');
  const [showError, setShowError] = React.useState<boolean>(false);



  return (
    <Stack
      alignItems="center"
      direction="column"
      justifyContent="flex-start"
      spacing={0.5}
      style={{ margin: '1.5em' }}
    >
      <Typography style={{ color: 'whitesmoke' }}>Master password</Typography>
      <TextField
        error={showError}
        placeholder="Message..."
        value={password}
        style={textAreaStyles}
        type="password"
        helperText={showError ? 'incorrect password' : ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
          setShowError(false);
        }}
      />
      <Button
        size="large"
        variant="contained"
        style={{ marginTop: '1em' }}
      >
        Login
      </Button>
    </Stack>
  );
};

export default AdminLogin;
