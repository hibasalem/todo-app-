import React from 'react';
import ToDo from './components/Todo.js';
import SettingsContext from './context/settings/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header.js';
import SettingsForm from './components/SettingsForm.js';
import './app.scss';

export default class App extends React.Component {
  render() {
    return (
      <SettingsContext>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <ToDo />
            </Route>
            <Route exact path="/settings">
              <SettingsForm />
            </Route>
          </Switch>
        </BrowserRouter>
      </SettingsContext>
    );
  }
}
