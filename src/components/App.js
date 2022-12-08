import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import api from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Register from './Register';
import Login from './Login';
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ProtectedRoute from "./PretectedRoute.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
//import { render } from "@testing-library/react";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistred] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  })
  //const [avatar, setAvatar] = useState('')
  const [cards, setCards] = useState([]) 
  const [isEditProfilePopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState();
  const closeAllPopups = () => {
    setEditPopupOpen(false)
    setAddPopupOpen(false)
    setAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setselectedCard(null)
  }
  useEffect(() => {
    api.getUser()
    .then((user) => setCurrentUser(user))
    .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    api.getCards()
    .then((cards) => {
      setCards(cards);
  })
  .catch(err => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(err))
  }
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card)
      .then(() => setCards(cards.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err))
    }
  }
  const handleUpdateUser = (user) => {
    api.patchUser(user)
    .then((user) => {
      setCurrentUser(user)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }
  const handleUpdateAvatar = (avatar) => {
    api.setAvatar(avatar)
    .then((user) => {
      setCurrentUser(user)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }
  const handleAddPlaceSubmit = (card) => {
    api.addCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }
  return (
    <>
    <BrowserRouter>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} registered={registered} //email={email}
        />
        <Switch>
          <ProtectedRoute
            path='/'
            onEditProfile={() => setEditPopupOpen(true)} 
            onAddPlace={() => setAddPopupOpen(true)} 
            onEditAvatar={() => setAvatarPopupOpen(true)}
            isDeletePopup={() => setDeletePopupOpen(true)}
            onCardClick={(card) => setselectedCard(card)}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            component={Main} />
          <Route path="/sign-in">
            <Login />
          </Route>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm name='deletion' title='Вы уверены?' button="Да" isOpen={isDeletePopupOpen}  />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />     
      </div>   
    </CurrentUserContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
