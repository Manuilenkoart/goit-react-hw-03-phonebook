import React, { Component } from 'react';
import uuidv1 from 'uuid';

import Search from './Search';

export default class App extends Component {
  state = {
    phoneBook: [],
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleFilter = option => {
    const filteredList = this.state.phoneBook.filter(el => el.name === option);
    const filteredByName = filteredList[0];

    return filteredByName;
  };

  onContacts = item => {
    this.setState(state => ({
      phoneBook: [...state.phoneBook, item],
    }));
  };

  deleteContact = contactId => {
    this.setState(state => ({
      phoneBook: state.phoneBook.filter(contact => contact.id !== contactId),
    }));
    this.setState({
      query: '',
    });
  };

  render() {
    const { phoneBook, query } = this.state;
    const filteredContanct = this.handleFilter(query);

    return (
      <div>
        <h1>Phonebook</h1>

        <Search onContacts={this.onContacts} onPhoneBook={phoneBook} />
        <h2>Contacts</h2>
        <legend>
          <span>filter contacts by name: </span>
          <input type="text" value={query} onChange={this.handleChange} />
        </legend>

        {phoneBook.length < 1 && <p>no saves contacts</p>}
        <ul>
          {filteredContanct ? (
            <li>
              <p>{filteredContanct.name}</p>
              <p>{filteredContanct.phone}</p>
              <button
                type="button"
                onClick={() => this.deleteContact(filteredContanct.id)}
              >
                delete
              </button>
            </li>
          ) : (
            phoneBook.map(el => (
              <li key={uuidv1()}>
                <p>Name:{el.name}</p>
                <p>Phone: {el.phone}</p>
                <button type="button" onClick={() => this.deleteContact(el.id)}>
                  delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}
