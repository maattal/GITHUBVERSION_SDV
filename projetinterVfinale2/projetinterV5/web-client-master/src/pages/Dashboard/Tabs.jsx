import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Deliveries from './Deliveries';
import UndispatchedDeliveries from './Deliveries';
import ScheduleDelivery from '../ScheduleDelivery';
import DispatchDelivery from '../DispatchDelivery';
import Diagrams from '../Diagrams';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
	backgroundColor: '#e1efff',
	
  },
  appBar:{
	backgroundColor: '#ffbb00',
  },
  tabs: {
	backgroundColor: '#ffbb00',
	fontSize: '15px',
	fontFamily: 'Zilla Slab',
	fontWeight:'bold'
  },
 
}));

export default function SimpleTabs() {
const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };
//
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" >
        <Tabs centered value={value}   onChange={handleChange} aria-label="simple tabs example" >
          <Tab  className={classes.tabs} label="Undone deliveries" {...a11yProps(0)} />
          <Tab className={classes.tabs} label="Schedule delivery" {...a11yProps(1)} />
          <Tab  className={classes.tabs} label="Undispatched deliveries" {...a11yProps(2)} />
          <Tab  className={classes.tabs} label="Dispatch delivery" {...a11yProps(3)} />
		  <Tab className={classes.tabs} label="Show diagrams" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Deliveries dataFromParent = {false}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScheduleDelivery/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UndispatchedDeliveries dataFromParent = {true}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DispatchDelivery/>
      </TabPanel>
	  <TabPanel value={value} index={4}>
        <Diagrams/>
      </TabPanel>
    </div>
  );
}




























































	
	
	
	
	
	
	


