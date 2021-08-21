import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/context';
import { If, Else, Then } from 'react-if';
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  Label,
  NumericInput,
  Switch,
} from '@blueprintjs/core';

export default function Login() {
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
      <Button
        onClick={(e) => {
          setactive('login');
        }}
      >
        log in
      </Button>
      <Button
        onClick={(e) => {
          setactive('signup');
        }}
      >
        sign up
      </Button>

      <If condition={active}>
        <Then>
          <div>
            <Card>
              <h3>Log in</h3>
              <form onSubmit={handleSubmit}>
                <FormGroup labelFor="text-input">
                  <Label>
                    user name
                    <InputGroup
                      onChange={(e) => {
                        setusername(e.target.value);
                      }}
                      name="text"
                      id="text-input"
                      placeholder="user name"
                      required
                    />
                  </Label>

                  <Label>
                    password
                    <InputGroup
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      name="text"
                      id="text-input"
                      placeholder="password"
                      type="password"
                      required
                    />
                  </Label>

                  <If condition={active == 'signup'}>
                    <Then>
                      <Label>
                        role
                        <div className="bp3-html-select .modifier">
                          <select
                            name="role"
                            onChange={(e) => {
                              setrole(e.target.value);
                            }}
                          >
                            <option defaultValue>Select role..</option>
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="writer">Writer</option>
                            <option value="user"> User</option>
                          </select>
                        </div>
                      </Label>
                      <Button type="submit">Sign up</Button>
                    </Then>
                    <Else>
                      <Button type="submit">Log In </Button>
                    </Else>
                  </If>
                </FormGroup>
              </form>
            </Card>
          </div>
        </Then>
      </If>
    </div>
  );
}
