import React, { useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Main from './Main.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `delete-button ${isOwn ? '' : 'delete-button_inactive'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `like-button ${isLiked ? 'like-button_active' : ''}`;
  return (
    <article className="element">
      <button className="image-button" type="button" onClick={() => onCardClick(card)}>
        <img className="element__image" src={card.link} alt={card.name}/>
      </button>
      <button className="delete-button" className={cardDeleteButtonClassName} onClick={() => onCardDelete(card)} type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} onClick={() => onCardLike(card)} 
            type="button"></button>
          <h3 className="element__like-count">{card.likes.length}</h3>
        </div>
      </div>
    </article>
  )
}
export default Card;