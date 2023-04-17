import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function ChannelMenu() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDetail, setChannelDetail] = useState('');

  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleChangeChannelName = useCallback((e) => setChannelName(e.target.value), []);

  const handleChangeChannelDetail = useCallback((e) => setChannelDetail(e.target.value), []);

  return (
    <>
      <List sx={{ overflow: 'auto', width: 240, backgroundColor: '#4c3c4c' }}>
        <ListItem
          secondaryAction={
            <IconButton sx={{ color: '#9A939B' }} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon sx={{ color: '#9A939B' }}>
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText primary='채널' sx={{ wordBreak: 'break-all', color: '#9A939B' }} />
        </ListItem>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>채널 추가</DialogTitle>
          <DialogContent>
            <DialogContentText>생성할 채널명과 설명을 입력해주세요.</DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              label='채널명'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleChangeChannelName}
              autoComplete='off'
            />
            <TextField
              margin='dense'
              label='설명'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleChangeChannelDetail}
              autoComplete='off'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </List>
    </>
  );
}

export default ChannelMenu;
