import { Box, Drawer, Toolbar } from '@mui/material';
import React from 'react';
import ChannelMenu from '../components/Menu/ChannelMenu';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

function Main() {
  const { theme } = useSelector((state) => state);
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#4c3c4c' }}>
      <Header />
      <Drawer variant='permanent' sx={{ width: 300 }} className='no-scroll'>
        <Toolbar />
        <Box sx={{ display: 'flex', minHeight: 'calc( 100vh - 64px )' }}>
          <ChannelMenu />
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}

export default Main;
