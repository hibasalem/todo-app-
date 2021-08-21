import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
const API = 'https://auth-server-401.herokuapp.com';
export const AuthContext = React.createContext();

export default function context(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [token, settoken] = useState('');

  useEffect(() => {
    const mytoken = cookie.load('auth');
    console.log(mytoken);
    validateToken(mytoken);
  }, []);

  const validateToken = (mytoken) => {
    if (
      mytoken !== 'null' &&
      mytoken !== 'undefined' &&
      mytoken !== undefined
    ) {
      const user = jwt.decode(mytoken);
      cookie.save('auth', mytoken);
      setloggedIn(true);
      setuser(user);
      settoken(mytoken);
      console.log('if', mytoken);
    } else {
      setloggedIn(false);
      setuser({});
      settoken('null');
      console.log('else', loggedIn, user);
    }
  };

  const signup = async (username, password, role) => {
    const response = await superagent
      .post(`${API}/signup`)
      .send({
        username: username,
        password: password,
        role: role,
      })
      .then(alert(' sign up successed now you will be logged in '));
    validateToken(response.body.token);
  };

  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set(
          'authorization',
          `Basic ${base64.encode(`${username}:${password}`)}`
        );
      validateToken(response.body.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = () => {
    setloggedIn(false);
    setuser({});
    settoken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        loggedIn,
        setloggedIn,
        user,
        setuser,
        token,
        settoken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
