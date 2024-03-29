import React, {useContext} from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  // owner of this card
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
  );

  // is liked by current user
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}></button>
      <img onClick={handleClick} alt={card.name} src={card.link} className="card__image" />
      <div className="card__description">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__likes">

          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}>
          </button>
          <span className="card__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
