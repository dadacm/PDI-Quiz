/* eslint-disable no-restricted-globals */
import { Button } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div>
      <h1>PDF Tools</h1>
      <Button type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
