import React from 'react';
import ToDo from './components/Todo.js';
import SettingsContext from './context/settings/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import SettingsForm from './components/SettingsForm.jsx';
import AuthContext from './context/auth/context.js';
import './app.scss';
import Auth from './components/Auth.jsx';

export default class App extends React.Component {
  render() {
    return (
      <AuthContext>
        <SettingsContext>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/">
                <ToDo />
                <SettingsForm />
              </Route>
              <Route exact path="/settings">
                <SettingsForm />
              </Route>
            </Switch>
          </BrowserRouter>
        </SettingsContext>
      </AuthContext>
    );
  }
}
