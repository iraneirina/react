import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from 'src/store/messages/slice';
import { selectChats } from 'src/store/messages/selectors';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ChatList: FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const chats = useSelector(
    selectChats,
    (prev, next) => prev.length === next.length
  );

  const isEmptyField = !value;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      dispatch(addChat(value));
      setValue('');
    }
  };

  return (
    <>
      <div className="main-container-chats">
        <div className="chats-form">
          <div>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <Box
            sx={{ display: 'flex', paddingTop: '10px', paddingRight: '5px' }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="New chat name"
              variant="filled"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              sx={{ width: '40ch' }}
            />
            <IconButton
              color="primary"
              disabled={isEmptyField}
              type="submit"
              sx={{ fontSize: '30px' }}
            >
              <PersonAddAltRoundedIcon />
            </IconButton>
          </Box>
        </div>
        <div className="chats-container">
          <List sx={{ width: '100%' }}>
            {chats.map((chat) => (
              <ListItem
                sx={{ borderBottom: 'solid #d3d3d3', paddingLeft: '0px' }}
                key={chat.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(deleteChat(chat.name))}
                  >
                    <DeleteIcon sx={{ color: '#f8a7a7' }} />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <Person2RoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <NavLink
                  className="chat-item"
                  to={`/chats/${chat.name}`}
                  style={({ isActive }) => ({
                    color: isActive ? '#4682B4' : '#7b7b7b',
                  })}
                >
                  {chat.name}
                </NavLink>
              </ListItem>
            ))}
          </List>
          {!chats.length && (
            <Typography
              align="center"
              sx={{ width: '100%', mt: 2, float: 'left' }}
            >
              You do not have any chats
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};
