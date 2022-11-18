import React, { useEffect, useState } from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js';
import Card from './Card.js';



function App() {
  const [isEditProfilePopupOpen, handleAddPlaceOpen] = useState(false);
  const [isAddPlacePopupOpen, handleEditProfileOpen] = useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarOpen] = useState(false);
  const [isDeletePopupOpen, handleDeletePopupOpen] = useState(false)
  const [selectedCard, handleCardClick] = useState()
  const closeAllPopups = () => {
    handleEditProfileOpen(false)
    handleAddPlaceOpen(false)
    handleEditAvatarOpen(false)
    handleDeletePopupOpen(false)
    handleCardClick(null)
  }
  
  

  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile={() => handleEditProfileOpen(true)} 
      onAddPlace={() => handleAddPlaceOpen(true)} 
      onEditAvatar={() => handleEditAvatarOpen(true)}
      isDeletePopup={() => handleDeletePopupOpen(true)}
      onCardClick={(card) => handleCardClick(card)}
      />
      <Footer />
      <PopupWithForm name={'info'} title={'Редактировать профиль'} button={"Сохранить"} children={
        <fieldset className="form__info">
          <input id="name-input" className="form__input form__input_type_name" type="text" placeholder="Имя" name='name' defaultValue="" required minLength="2" maxLength="40"/>
          <span id="name-input-error"></span>
          <input id="about-input" className="form__input popup__input form__input_type_about" type="text" placeholder="О себе" name="about" defaultValue="" required minLength="2" maxLength="200"/>
          <span id="about-input-error"></span>
        </fieldset>
      }  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name={'place'} title={"Новое место"} button={"Создать"} children={
        <fieldset className="form__info">
          <input id='place-input' className="form__input form__input_type_card-name" type="text" placeholder="Название" name="name" defaultValue="" required minLength="2" maxLength="30"/>
          <span id="place-input-error"></span>
          <input id='link-input' className="form__input form__input_type_card-link" type="url" placeholder="Ссылка на картинку" name="link" defaultValue="" required/>
          <span id="link-input-error"></span>
        </fieldset>
      } isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name={'avatar'} title={"Обновить аватар"} button={"Сохранить"} children={
        <fieldset className="form__info form__info_type_avatar">
          <input id="avatar-input" className="form__input form__input_type_avatar" type="url" placeholder="Ссылка на фото" name="link" defaultValue="" required/>
          <span id="avatar-input-error"></span>
        </fieldset>
      } isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name={'deletion'} title={'Вы уверены?'} button={"Да"} isOpen={isDeletePopupOpen}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
