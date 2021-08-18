import React, { Component } from 'react';
export const settingsContext = React.createContext();

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // list: [],
      // incomplete: [],
      itemsPerPage: 3,
      sort: 'Ascending',
      show: true,
    };
  }

  render() {
    return (
      <settingsContext.Provider value={this.state}>
        {this.props.children}
      </settingsContext.Provider>
    );
  }
}
