import css from './App.module.css';
import { useState, useEffect } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const shortid = require('shortid');

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('PhoneList')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('PhoneList', JSON.stringify(contacts));
  }, [contacts]);




const removeContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const addContact = data => {
    const contact = { id: shortid.generate(), ...data };
    if (contacts.find(o => o.name === data.name)) {
      return alert(`<< ${data.name} >> is already in contacts`);
    } else {
      setContacts(prev => [contact, ...prev]);
    }
  };
  
  const changeFilter = e => {
    setFilter( e.currentTarget.value);
  };

  
    const normalizeFilter = filter.toLowerCase();
    const foundContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Find contacts</h2>
        <Filter onChange={changeFilter} filterValue={filter} />
        <ContactList list={foundContacts} removeCard={removeContact} />
      </div>
    );
  
}