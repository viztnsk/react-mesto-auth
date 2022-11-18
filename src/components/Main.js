import React, { useEffect, useState } from "react";
import editButton from '../images/editButton.svg';
import addButton from '../images/addButton.svg';
import editAvatarButton from '../images/editAvatarButton.svg'
import Card from './Card.js'
import api from '../utils/Api.js';

function Main(props) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])
  
  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
    .then(([data, cards]) => {
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
      setCards(cards);
  })
  .catch(err => console.log(err))
  }, [])
  return (
    <main className="content">
        <section className="profile">
          <button className="avatar-button" type="button" onClick={props.onEditAvatar}>
            <div className="avatar">
              <img className="avatar__image" src={userAvatar} alt="Аватар"/>
              <div className="avatar__cover">
                <img className="avatar__edit-button" src={editAvatarButton} alt="Изменить аватар"/>
              </div>
          </div>
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="edit-button" onClick={props.onEditProfile} type="button"><img src={editButton} alt="Кнопка редактирования"/></button>
          <button className="add-button" onClick={props.onAddPlace} type="button"><img src={addButton} alt="Кнопка добавления"/></button>
        </section>
        <section className="elements">
          {cards.map(card => (<Card card={card} onCardClick={props.onCardClick} key={card._id} />
          ))}
        </section>
      </main>
  )
}

export default Main;
