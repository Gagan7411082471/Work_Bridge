import { Avatar, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase/setup';
import { useLocation } from 'react-router-dom';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

function Connection() {
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [sentRequests, setSentRequests] = useState({}); // Track sent requests

  const getUsers = async () => {
    const userRef = collection(database, "Users");
    try {
      const data = await getDocs(userRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const sendRequest = async (userId) => {
    const requestDoc = doc(database, "Users", `${userId}`);
    const connectRef = doc(requestDoc, "RequestIn", `${auth.currentUser?.uid}`);
    try {
      await setDoc(connectRef, {
        username: location.state.username,
        designation: location.state.designation,
        profile_image: location.state.profile_img,
        id: auth.currentUser?.uid,
        status: "pending",
      });
      
      // Update the sent requests state
      setSentRequests((prevState) => ({
        ...prevState,
        [userId]: true, // Mark this user as having a sent request
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#F6F7F3", height: "100vh" }}>
      {userData
        .filter((user) => user.id !== auth.currentUser?.uid)
        .map((otherUser) => (
          <Paper key={otherUser.id} style={{ marginBottom: "10px", padding: "10px", marginLeft: "10px", marginRight: "10px" }}>
            <List>
              <ListItem>
                <Avatar src={otherUser.profile_image} />
                <ListItemText primary={otherUser.username} secondary={otherUser.designation} />
                <Button
                  onClick={() => sendRequest(otherUser.id)}
                  variant="outlined"
                  size="small"
                  disabled={sentRequests[otherUser.id]} // Disable button if request is sent
                  sx={{
                    ml: '10px',
                    '&:hover': {
                      backgroundColor: '#3f51b5', // Hover color
                      color: 'white', // Text color change on hover
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
                    },
                  }}
                >
                  {sentRequests[otherUser.id] ? 'Request Sent' : 'Connect'} {/* Change text based on state */}
                </Button>
              </ListItem>
            </List>
          </Paper>
        ))}
    </div>
  );
}

export default Connection;
