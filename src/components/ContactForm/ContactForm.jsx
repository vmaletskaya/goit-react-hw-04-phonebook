import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import {useState} from 'react';



export default function ContactForm (props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 

 const onInputValue = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
 const handlerOnSubmit = e => {
    e.preventDefault();
    props.onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };



    return (
      <form action="" className={css.form} onSubmit={handlerOnSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onInputValue}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={onInputValue}
          />
        </label>
        <button type="submit" className={css.addContact}>
          Add Contact
        </button>
      </form>
    );
  
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};