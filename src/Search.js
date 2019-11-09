import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default class Search extends Component {
  static propTypes = {
    onContacts: PropTypes.func.isRequired,
    onPhoneBook: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    name: '',
    phone: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, id: uuidv1() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    if (!this.isUn(name)) {
      toast.info(`${name} 
      already in the phone book`);
      return;
    }
    this.props.onContacts({ ...this.state });

    this.reset();
  };

  isUn = name => {
    return this.props.onPhoneBook.every(el => el.name !== name);
  };

  reset = () => {
    this.setState({ name: '', phone: '', isEnable: false });
  };

  render() {
    const { name, phone } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />
          <button type="submit">add contact</button>
        </form>
      </div>
    );
  }
}
