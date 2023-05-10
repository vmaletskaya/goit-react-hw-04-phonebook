import css from './App.module.css';
import { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const shortid = require('shortid');

export class App extends Component {
   state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('PhoneList', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const parcedContacts = JSON.parse(localStorage.getItem('PhoneList'));
    if (parcedContacts) {
      this.setState({ contacts: parcedContacts });
    }
  }

  checkInstance = data => {
    const filter = this.state.contacts.filter(e => {
      if (e.name === data.name) {
        return true;
      }
      return false;
    });
    console.log(filter);
  };

  removeContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  addContact = data => {
    const contact = { id: shortid.generate(), ...data };
    if (this.state.contacts.find(o => o.name === data.name)) {
      return alert(`<< ${data.name} >> is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };
  
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
    const normalizeFilter = this.state.filter.toLowerCase();
    const foundContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Find contacts</h2>
        <Filter onChange={this.changeFilter} filterValue={filter} />
        <ContactList list={foundContacts} removeCard={this.removeContact} />
      </div>
    );
  }
}