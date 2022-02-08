import React from 'react';

/** Components */
import AddBoardForm from './AddBoardForm';
import ManageBoards from './ManageBoards';
import ManageUsers from './ManageUsers';

/** UI */
import { Tabs, Tab, Box } from '@mui/material';

const AdminPanel: React.FC = (): JSX.Element => {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const renderTab = (): JSX.Element => {
    switch (tabIndex) {
      case 0:
        return <ManageBoards />;
      case 1:
        return <AddBoardForm setTabIndex={setTabIndex} />;
      case 2:
        return <ManageUsers />;

      default:
        return <ManageBoards />;
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        centered
        value={tabIndex}
        onClick={(e: any) => setTabIndex(e.target.tabIndex)}
        aria-label="basic tabs example"
        variant={'fullWidth'}
        textColor={'inherit'}
        style={{ color: 'whitesmoke' }}
      >
        <Tab label="Board management" tabIndex={0} />
        <Tab label="Create Board" tabIndex={1} />
        <Tab label="User management" tabIndex={2} />
      </Tabs>
      {renderTab()}
    </Box>
  );
};

export default AdminPanel;
