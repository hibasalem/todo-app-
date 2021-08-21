import React from 'react';
import { AuthContext } from '../context/auth/context';
import { If } from 'react-if';
import { useContext } from 'react';

export default function Auth(props) {
  const auth = useContext(AuthContext);

  let okToRender =
    auth.loggedIn && props.capability
      ? auth.user?.capabilities?.includes(props.capability)
      : false;

  return (
    <If condition={okToRender}>
      <div> {props.children}</div>
    </If>
  );
}
