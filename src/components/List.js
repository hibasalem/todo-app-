import React, { useContext, useState, useEffect } from 'react';
import { settingsContext } from '../context/settings/context';
import { Button, Card, Elevation } from '@blueprintjs/core';

export default function List(props) {
  const settings = useContext(settingsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeList, setactiveList] = useState(
    (settings.show ? props.list : props.incomplete).slice(
      0,
      settings.itemsPerPage
    )
  );
  const [pagesNum, setPagesNum] = useState(
    Math.ceil(props.list.length / settings.itemsPerPage)
  );

  useEffect(() => {
    setactiveList(
      (settings.show ? props.list : props.incomplete).slice(
        0,
        settings.itemsPerPage
      )
    );
    console.log(activeList);
    setPagesNum(
      Math.ceil(
        (settings.show ? props.list : props.incomplete).length /
          settings.itemsPerPage
      )
    );
  }, [props.list, props.incomplete]);

  useEffect(() => {
    let start = (currentPage - 1) * settings.itemsPerPage;
    let end = start + settings.itemsPerPage;
    setactiveList(
      (settings.show ? props.list : props.incomplete).slice(start, end)
    );
  }, [currentPage, settings.itemsPerPage]);

  const changePage = (pageNum) => {
    if (pageNum !== currentPage) setCurrentPage(pageNum);
    console.log(currentPage);
  };

  const Pages = () => {
    let pagesArr = [];
    if (currentPage > 1) {
      pagesArr.push(
        <Button
          class="@ns-button"
          type="button"
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          previous
        </Button>
      );
    }

    for (let i = 1; i <= pagesNum; i++) {
      pagesArr.push(
        <Button
          class="@ns-button"
          type="button"
          onClick={() => {
            changePage(i);
          }}
          key={i}
        >
          {i}
        </Button>
      );
    }

    if (currentPage <= pagesNum) {
      pagesArr.push(
        <Button
          class="@ns-button"
          type="button"
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          next
        </Button>
      );
    }

    return <div className="butns"> {pagesArr} </div>;
  };

  return (
    <div>
      <Card className="mainItem2">
        <h3>Items List</h3>
        {activeList.map((item) => (
          <Card
            className="listCard"
            interactive={true}
            elevation={Elevation.THREE}
            key={item.id}
          >
            <h3>
              <b>{item.text} </b>
            </h3>
            <p>
              <b>Assigned to</b> : {item.assignee}
            </p>
            <p>
              <b>Difficulty</b> : {item.difficulty}
            </p>
            <Button
              class="@ns-button"
              type="button"
              // intent="danger"
              className={
                item.complete ? 'bp3-intent-success' : 'bp3-intent-danger'
              }
              onClick={() => props.toggleComplete(item.id)}
            >
              Complete : {item.complete.toString()}
            </Button>
          </Card>
        ))}
      </Card>
      <Pages />
    </div>
  );
}
