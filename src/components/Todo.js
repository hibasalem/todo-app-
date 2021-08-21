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
import axios from 'axios';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const auth = useContext(AuthContext);

  useEffect(async () => {
    const allList = await axios.get(
      'https://api-js401.herokuapp.com/api/v1/todo'
    );
    setList(allList.data.results);
  }, []);

  useEffect(async () => {
    const allList = await axios.get(
      'https://api-js401.herokuapp.com/api/v1/todo'
    );
    setList(allList.data.results);
  }, [list]);

  async function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    await axios.post('https://api-js401.herokuapp.com/api/v1/todo', item);
    setList([...list, item]);
  }

  async function deleteItem(_id) {
    const items = list.filter((item) => item._id !== _id);
    await axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${_id}`);
    setList(items);
  }

  async function toggleComplete(_id, item) {
    const items = list.map((item) => {
      if (item._id == _id) {
        console.log(item, 'item');
        item.complete = !item.complete;
      }
      return item;
    });

    await axios.put(`https://api-js401.herokuapp.com/api/v1/todo/${_id}`, item);
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
        </Else>
      </If>
    </div>
  );
};

export default ToDo;
