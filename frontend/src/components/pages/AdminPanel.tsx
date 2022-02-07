import React from 'react';

/** UI */
import { Tabs, Tab, Box } from '@mui/material';

const AdminPanel: React.FC = (): JSX.Element => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        centered
        value={tabIndex}
        onClick={(e: any) => setTabIndex(e.target.tabIndex)}
        aria-label="basic tabs example"
        variant={'fullWidth'}
        textColor={'inherit'}
        style={{color: 'whitesmoke'}}
      >
        <Tab label="Boards" tabIndex={0} />
        <Tab label="Topics" tabIndex={1} />
        <Tab label="Users" tabIndex={2} />
      </Tabs>
    </Box>
  );
};

export default AdminPanel;
