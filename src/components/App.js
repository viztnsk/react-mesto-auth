import React, { createContext, useContext, useEffect, useState } from "react";
import api from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  })
  const [isEditProfilePopupOpen, setAddPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setEditPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setImagePopupOpen] = useState();
  const closeAllPopups = () => {
    setEditPopupOpen(false)
    setAddPopupOpen(false)
    setAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setImagePopupOpen(null)
  }
  useEffect(() => {
    api.getUser()
    .then((user) => setCurrentUser(user))
    .catch(err => console.log(err))
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
        onEditProfile={() => setEditPopupOpen(true)} 
        onAddPlace={() => setAddPopupOpen(true)} 
        onEditAvatar={() => setAvatarPopupOpen(true)}
        isDeletePopup={() => setDeletePopupOpen(true)}
        onCardClick={(card) => setImagePopupOpen(card)}
        />
        <Footer />
        <PopupWithForm name='info' title='Редактировать профиль' button="Сохранить" children={
          <fieldset className="form__info">
            <input id="name-input" className="form__input form__input_type_name" type="text" placeholder="Имя" name='name' defaultValue="" required minLength="2" maxLength="40"/>
            <span id="name-input-error"></span>
            <input id="about-input" className="form__input popup__input form__input_type_about" type="text" placeholder="О себе" name="about" defaultValue="" required minLength="2" maxLength="200"/>
            <span id="about-input-error"></span>
          </fieldset>
        }  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name='place' title="Новое место" button="Создать" children={
          <fieldset className="form__info">
            <input id='place-input' className="form__input form__input_type_card-name" type="text" placeholder="Название" name="name" defaultValue="" required minLength="2" maxLength="30"/>
            <span id="place-input-error"></span>
            <input id='link-input' className="form__input form__input_type_card-link" type="url" placeholder="Ссылка на картинку" name="link" defaultValue="" required/>
            <span id="link-input-error"></span>
          </fieldset>
        } isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name='avatar' title="Обновить аватар" button="Сохранить" children={
          <fieldset className="form__info form__info_type_avatar">
            <input id="avatar-input" className="form__input form__input_type_avatar" type="url" placeholder="Ссылка на фото" name="link" defaultValue="" required/>
            <span id="avatar-input-error"></span>
          </fieldset>
        } isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name='deletion' title='Вы уверены?' button="Да" isOpen={isDeletePopupOpen}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
      </CurrentUserContext.Provider>
      
  );
}

export default App;
