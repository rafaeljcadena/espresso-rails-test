import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StatementsTable from '../StatementsTable';
import StatementUpdateModal from '../StatementUpdateModal';
import axiosClient from '../../../configs/axiosClient';

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [statement, setStatement] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const prepareUpdateModal = (statementId, category ) => {
    setStatement({ id: statementId, category });
    toggleUpdateModal();
  };

  const toggleUpdateModal = () => {
    setUpdateModalOpen(prev => !prev);
  };

  const toggleRefreshData = () => {
    setRefreshData(prev => !prev);
  }

  useEffect(() => {
    if (updateModalOpen) return;

    if (Object.keys(statement).length > 0) setStatement({});
  }, [updateModalOpen]);

  useEffect(() => {
    axiosClient.get('/api/v1/categories.json')
      .then((res) => {
        const categoryOptions = res.data.map((category) => {
          return { label: category.name, id: category.id };
        })

        setCategoryList(categoryOptions);
      })
      .catch(err => {});
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Não comprovadas" {...a11yProps(0)} />
          <Tab label="Comprovadas" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StatementsTable
          emptyDataLabel="Até o momento, não há despesas pendentes de comprovação."
          prepareUpdateModal={prepareUpdateModal}
          refreshData={refreshData}
          filter="non_verified"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StatementsTable
          emptyDataLabel="Até o momento, não há despesas comprovadas."
          prepareUpdateModal={prepareUpdateModal}
          refreshData={refreshData}
          filter="verified"
        />
      </CustomTabPanel>
      <StatementUpdateModal
        open={updateModalOpen}
        categoryList={categoryList}
        statement={statement}
        toggleUpdateModal={toggleUpdateModal}
        archiveConfigObj={statement}
        toggleRefreshData={toggleRefreshData}
      />
    </Box>
  );
}
