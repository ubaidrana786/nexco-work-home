import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";
import axios from "axios";

const NoteState = (props) => {
  const prevAuth = window.localStorage.getItem("auth") || false;
  const prevUser = JSON.parse(window.localStorage.getItem("user")) || null;

  const [authToken, setAuthToken] = useState(prevAuth);
  const [currentUser, setCurrentUser] = useState(prevUser);
  const [totalData, setTotalData] = useState([]);


  useEffect(
    () => {
    
      if (!authToken) window.localStorage.clear();
      else window.localStorage.setItem('auth', authToken);

     
      if (!currentUser) localStorage.clear();
      else window.localStorage.setItem('user', JSON.stringify(currentUser));

     
    },
    [  authToken, currentUser]
  );

  
  useEffect(() => {
    FetchStudents();
  }, [])


  const FetchStudents = () => {
    axios.get('https://nexco-crm.herokuapp.com/api/students', {
      headers: {
        authorization: authToken
      }
    })
      .then((response) => {
 
       
        setTotalData(response.data.length)
      })
  }

  const defaultContext = {
    currentUser,
    setCurrentUser,
    authToken,
    setAuthToken,
    totalData,
    };
  return (
    <NoteContext.Provider value={defaultContext}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
