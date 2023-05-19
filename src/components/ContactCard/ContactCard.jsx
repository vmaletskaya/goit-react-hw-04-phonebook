import PropTypes from 'prop-types';
import css from './ContactCard.module.css';

export default function ContactCard({ name, number, id, deleteCard }) {
  const handleDeleteCard = e => {
    let currentId = e.currentTarget.parentNode.dataset.id;
    deleteCard(currentId);
  };

  return (
    <li className={css.cardItem} title={name} data-id={id}>
      <button
        type="button"
        className={css.button}
        onClick={handleDeleteCard}
      ></button>
      <p className={css.contact}>
        <span className={css.value}>
          {name}: {number}
        </span>
      </p>
    </li>
  );
}

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
