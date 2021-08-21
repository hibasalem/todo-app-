import React from 'react';
import { Card, Button, FormGroup, InputGroup } from '@blueprintjs/core';

export default function Form({ handleSubmit, handleChange }) {
  return (
    <Card className="mainItem">
      <h3>Add Item</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup labelFor="text-input" labelInfo="(required)">
          <label>To Do Item</label>
          <InputGroup
            onChange={handleChange}
            name="text"
            id="text-input"
            placeholder="Item Details"
          />
          <label>Assigned To</label>
          <InputGroup
            onChange={handleChange}
            name="assignee"
            id="text-input"
            placeholder="Assignee Name"
          />
          <lable>Difficulty</lable>
          <input
            onChange={handleChange}
            defaultValue={1}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />

          <Button type="submit">Add Item</Button>
        </FormGroup>
      </form>
    </Card>
  );
}
