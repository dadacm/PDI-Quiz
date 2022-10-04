import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StudantRegistration from '../studantRegistration/StudantRegistration';
import QuestionRegistration from '../questionRegistration/QuestionRegistration';
import { PainelContainer } from './NavTabs.style';
import RegisteredTests from '../resgisteredTests/RegisteredTests';
import GenerateTest from '../generateTest/GenerateTest';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        style={{ display: 'block', width: '20%' }}
        orientation="vertical"
        variant="fullWidth"
        indicatorColor="primary"
        value={value}
        textColor="primary"
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}>
        <Tab label="Criar nova questão" {...a11yProps(0)} />
        <Tab label="Cadastrar alunos" {...a11yProps(1)} />
        <Tab label="Cadastrar Prova" {...a11yProps(2)} />
        <Tab label="Provas cadastradas" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <PainelContainer>
          <QuestionRegistration />
        </PainelContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PainelContainer>
          <StudantRegistration />
        </PainelContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PainelContainer>
          <GenerateTest />
        </PainelContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PainelContainer>
          <RegisteredTests />
        </PainelContainer>
      </TabPanel>
    </div>
  );
}
