import { Box, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import Header from '../../../Components/header/Header';
import VerticalTabs from '../../../Components/teacherComponents/navTabs/NavTabs';

function Home() {
  const userString = localStorage.getItem('user');
  const user = userString && JSON.parse(userString);
  return (
    <div>
      <Header />
      <VerticalTabs />
    </div>
  );
}

export default Home;
