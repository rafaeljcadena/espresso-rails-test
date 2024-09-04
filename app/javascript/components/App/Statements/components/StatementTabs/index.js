import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StatementsTable from '../StatementsTable';
import StatementArchiveModal from '../StatementArchiveModal';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StatementTabs() {
  const [value, setValue] = React.useState(0);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [archiveConfigObj, setArchiveConfigObj] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const prepareArchiveModal = (statementId) => {
    setArchiveConfigObj({ statementId });
    toggleArchiveModalOpen();
  }

  const toggleArchiveModalOpen = () => {
    setArchiveModalOpen(prev => !prev);
  }

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  }

  useEffect(() => {
    if (archiveModalOpen) return;

    if (Object.keys(archiveConfigObj).length > 0) setArchiveConfigObj({});
  }, [archiveModalOpen]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Lista" {...a11yProps(0)} />
          <Tab label="Arquivadas" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StatementsTable
          emptyDataLabel="Até o momento, não há despesas listadas."
          prepareArchiveModal={prepareArchiveModal}
          refreshData={refreshData}
        />
        <StatementArchiveModal
          open={archiveModalOpen}
          toggleArchiveModalOpen={toggleArchiveModalOpen}
          archiveConfigObj={archiveConfigObj}
          toggleRefreshData={toggleRefreshData}
        /> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StatementsTable
          emptyDataLabel="Até o momento, não há despesas arquivadas."
          archived
        />
      </CustomTabPanel>
    </Box>
  );
}
