import { Button } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderDiv, Username } from './Header.style';
import { HeaderTypes } from './HeaderTypes';

function Header(props: HeaderTypes) {
  const userString = localStorage.getItem('user');
  const user = userString && JSON.parse(userString);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <HeaderDiv>
      <Username>{user?.username}</Username>
      <h1>PDI Test</h1>
      <Button style={{ color: 'white' }} type="submit" onClick={handleLogout}>
        Sair
      </Button>
    </HeaderDiv>
  );
}

export default Header;
