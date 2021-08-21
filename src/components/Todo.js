import React, { useEffect, useState, useContext } from 'react';
import useForm from '../hooks/form.js';
import List from './List';
import { v4 as uuid } from 'uuid';
import Form from './Form.jsx';
import Auth from './Auth.jsx';
import Login from './Login.jsx';
import { If, Else, Then } from 'react-if';
import { AuthContext } from '../context/auth/context';
import Logout from './Logout.jsx';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const auth = useContext(AuthContext);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
  }, [list]);

  return (
    <div className="mainsec">
      <If condition={!auth.loggedIn}>
        <Then>
          <Login />
        </Then>
        <Else>
          <Logout />
        </Else>
      </If>
      <If condition={auth.loggedIn}>
        <Then>
          <Auth capability="read">
            <h2>{incomplete.length} items pending</h2>

            <div className="mainCards">
              <Auth capability="create">
                <Form handleChange={handleChange} handleSubmit={handleSubmit} />
              </Auth>

              <List
                incomplete={incomplete}
                list={list}
                toggleComplete={toggleComplete}
                deleteItem={deleteItem}
              />
            </div>
          </Auth>
        </Then>
      </If>
    </div>
  );
};

export default ToDo;
