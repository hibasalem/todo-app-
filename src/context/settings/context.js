import React, { useState, useEffect } from 'react';
export const settingsContext = React.createContext();

export default function Settings(props) {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [show, setShow] = useState(true);
  const [sort, setSort] = useState('Ascending');

  useEffect(() => {
    let raw = localStorage.getItem('settings');
    if (raw) {
      let data = JSON.parse(raw);
      console.log('data', data);
      setItemsPerPage(Number(data.itemPerPage));

      setShow(data.show == 'on' ? true : false);
    }
  }, []);

  return (
    <div>
      <settingsContext.Provider
        value={{
          itemsPerPage,
          setItemsPerPage,
          show,
          setShow,
          sort,
          setSort,
        }}
      >
        {props.children}
      </settingsContext.Provider>
    </div>
  );
}
