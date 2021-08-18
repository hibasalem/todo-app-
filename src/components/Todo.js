import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form.js';
import List from './List';
import { v4 as uuid } from 'uuid';
import Form from './Form.js';

const ToDo = () => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

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
      <h2>{incomplete.length} items pending</h2>

      <div className="mainCards">
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <List
          incomplete={incomplete}
          list={list}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default ToDo;
