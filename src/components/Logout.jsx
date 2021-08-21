import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/context';
import { If, Else, Then } from 'react-if';
import { Button } from '@blueprintjs/core';

export default function Logout() {
  const auth = useContext(AuthContext);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState(null);
  const [active, setactive] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role) {
      auth.signup(username, password, role);
      setrole(null);
    } else {
      auth.login(username, password);
    }
  };

  return (
    <div>
      <Button onClick={() => auth.logout()}>logout</Button>
    </div>
  );
}
