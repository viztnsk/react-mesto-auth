import React, { useEffect, useState } from "react";
import editButton from '../images/editButton.svg';
import addButton from '../images/addButton.svg';
import editAvatarButton from '../images/editAvatarButton.svg'
import Card from './Card.js'
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props) { 
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = useState([]) 

  useEffect(() => {
    api.getCards()
    .then((cards) => {
      setCards(cards);
  })
  .catch(err => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card);
    }
  }
  return (
    <main className="content">
        <section className="profile">
          <button className="avatar-button" type="button" onClick={props.onEditAvatar}>
            <div className="avatar">
              <img className="avatar__image" src={currentUser.avatar} alt="Аватар"/>
              <div className="avatar__cover">
                <img className="avatar__edit-button" src={editAvatarButton} alt="Изменить аватар"/>
              </div>
          </div>
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="edit-button" onClick={props.onEditProfile} type="button"><img src={editButton} alt="Кнопка редактирования"/></button>
          <button className="add-button" onClick={props.onAddPlace} type="button"><img src={addButton} alt="Кнопка добавления"/></button>
        </section>
        <section className="elements">
        {cards.map(card => (<Card card={card} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} key={card._id} />))} 
        </section>
      </main>
  )
}

export default Main;
