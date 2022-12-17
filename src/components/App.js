import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import api from '../utils/Api.js';
import * as auth from '../utils/auth.js'
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
import InfoTooltip from './InfoTooltip.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
//import { render } from "@testing-library/react";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  })
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  const [cards, setCards] = useState([]) 
  const [isEditProfilePopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState();
  
  const closeAllPopups = () => {
    setEditPopupOpen(false)
    setAddPopupOpen(false)
    setAvatarPopupOpen(false)
    setDeletePopupOpen(false)
    setInfoTooltipOpen(false)
    setselectedCard(null)
  }
  useEffect(() => {
    if (loggedIn) {
      api.getUser()
    .then((user) => setCurrentUser(user))
    .catch(err => console.log(err))
    }
  }, [loggedIn])
  
  useEffect(() => {
    if (loggedIn) {
    api.getCards()
    .then((cards) => setCards(cards))
    .catch(err => console.log(err))
    }
  }, [loggedIn])

  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email)
  }

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token');
      if (token) {
        auth.getContent(token).then((res) => {
          if (res) {
            setEmail(res.data.email)
            handleLogin(res.data.email)
          }
        })
        .catch((err) => console.log(err))
        .finally(() => history.push("/"))
      }
    }
  }, [loggedIn, history, email] )

  function handleLoginSubmit(values) {
    auth.authorize(values.email, values.password)
    .then((res) => {
      localStorage.setItem('token', res.token)
      handleLogin(values.email);
    })
    .then(() => history.push('/'))
    .catch((err) => {
      console.log(err)
      setStatus(false)
      handleInfoTooltipOpen()
    });
    }

  function handleRegisterSubmit(values) {
    auth.register(values.email, values.password)
    .then((res) => {
      if (res) {
        setStatus(true)
        handleInfoTooltipOpen()
      }})
      .then(() => {
        history.push('/sign-in')
      })
      .catch((err) => {
        console.log(err)
        setStatus(false)
        handleInfoTooltipOpen()
      })
  }
  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true)
  }

  function handleSignOut() {
    localStorage.removeItem('token')
    setEmail('')
  }
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={() => setEditPopupOpen(true)} 
            onAddPlace={() => setAddPopupOpen(true)} 
            onEditAvatar={() => setAvatarPopupOpen(true)}
            isDeletePopup={() => setDeletePopupOpen(true)}
            onCardClick={(card) => setselectedCard(card)}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
          <Route path="/sign-in">
            <Login onLogin={handleLoginSubmit}/>
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegisterSubmit}/>
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status} success={"Вы успешно зарегистрировались!"} fail={"Что-то пошло не так! Попробуйте ещё раз."}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name='deletion' title='Вы уверены?' button="Да" isOpen={isDeletePopupOpen}  />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />     
      </div>   
    </CurrentUserContext.Provider>
    </>
  );
}

export default App;
