import { Divider, Grid, List, Paper, Toolbar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import '../../firebase';
import { child, get, getDatabase, onChildAdded, orderByChild, query, ref, startAt } from 'firebase/database';
function Chat() {
  const { channel, user } = useSelector((state) => state);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef();
  useEffect(() => {
    if (!channel.currentChannel) return;
    async function getMessages() {
      const snapShot = await get(child(ref(getDatabase()), 'messages/' + channel.currentChannel.id));
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : []);
    }
    getMessages();
    return () => {
      setMessages([]);
    };
  }, [channel.currentChannel]);

  useEffect(() => {
    if (!channel.currentChannel) return;
    const sorted = query(ref(getDatabase(), 'messages/' + channel.currentChannel.id), orderByChild('timestamp'));
    const unsubscribe = onChildAdded(query(sorted, startAt(Date.now())), (snapshot) =>
      setMessages((oldMessages) => [...oldMessages, snapshot.val()])
    );
    //현재시점으로 추가된 메세지만 가져오도록.setMessages하면 전체 메세지 렌더링되어 속도가 느림.
    return () => {
      unsubscribe?.();
    };
  }, [channel.currentChannel]);

  //메세지스크롤
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [messages.length]);

  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={channel.currentChannel} />
      <Grid container component={Paper} variant='outlined' sx={{ mt: 3, position: 'relative' }}>
        <List
          sx={{
            height: 'calc(100vh - 350px)',
            overflow: 'scroll',
            width: '100%',
            position: 'relative',
          }}
        >
          {messages.map((message) => (
            <ChatMessage key={message.timestamp} message={message} user={user} />
          ))}
          <div ref={messageEndRef}></div>
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  );
}

export default Chat;
