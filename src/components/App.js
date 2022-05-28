import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup.js'
import LogIn from './LogIn'
import { Route, Switch, Link } from 'react-router-dom'
import Register from './Register'
import * as auth from './../utils/auth'
import { useHistory } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { Redirect } from 'react-router-dom'
import InfoTooltip from './InfoTooltip'
function App () {
  // State constants
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  )
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  )
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const history = useHistory()
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false)
  const [message, setMessage] = React.useState(false)
  // Effects
  React.useEffect(() => {
    Promise.all([api.getCards(), api.getProfileInfo()])
      .then(([cards, userData]) => {
        setCards(cards)
        setCurrentUser(userData)
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }, [])
  /*   React.useEffect(() => {
    checkToken()
  }, []) */
  //Handlers
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setInfoTooltip(false)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleEditProfileChange ({ name, about }) {
    api
      .editProfileInfo({ name, about })
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleEditAvatar (avatar) {
    api
      .changeAvatar(avatar)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleCardDelete (card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards =>
          cards.filter(item => {
            return item._id !== card._id
          })
        )
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }

  function handleAddPlaceSubmit (newCard) {
    api
      .postCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }
  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then(response => {
        console.log('register:', response)
        if (response.data) {
          /*       setUserData({
            username: response.user.username,
            email: response.user.email
          }) */
          setMessage(true)
          setInfoTooltip(true)
          React.setTimeOut(() => {
            history.push('/sign-in')
          }, 3000)
        } else {
          setMessage(false)
          setInfoTooltip(true)
        }
      })
      .then(res => {
        if (!res.data) {
          setMessage(false)
          setInfoTooltip(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleLogin = (password, email) => {
    auth.login(password, email).then(response => {
      console.log('auth:', response)
      if (response) {
        localStorage.setItem('jwt', response.jwt)
        setIsLoggedIn(true)

        history.push('/main')
      } else {
        setMessage(false)
        setInfoTooltip(true)
      }
    })
  }
  /*   const checkToken = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      console.log('jwt', jwt)
      auth.checkToken(jwt).then(response => {
        console.log('token:', response)
        setIsLoggedIn(true)
        history.push('/main')
      })
    }
  } */
  /*   const handleSignOut = () => {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    //navigate('/login')
    history.push('/login')
  } */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute path='/main' isLoggedIn={isLoggedIn}>
          <Header />
          <Main
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleEditProfileChange}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleEditAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name={'ausure'}
            title='Вы уверены?'
            onClose={closeAllPopups}
          >
            <input type='hidden' name='id' defaultValue='' />

            <button
              type='submit'
              className='popup__submit popup__submit_size_s'
              aria-label='Кнопка согласия'
            >
              Да
            </button>
          </PopupWithForm>
        </ProtectedRoute>
        <Route path='/sign-up'>
          <Header>
            <Link to='sign-in' className='link'>
              Войти
            </Link>
          </Header>
          <div className='form__container'>
            <Register onRegister={handleRegister} />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            message={message}
            isOpen={isInfoTooltipOpen}
          />
        </Route>
        <Route path='/sign-in'>
          <Header>
            <Link to='sign-up' className='header__link link'>
              Регистрация
            </Link>
          </Header>
          <div className='form__container'>
            <LogIn onLogin={handleLogin} />
          </div>
          <InfoTooltip
            onClose={closeAllPopups}
            message={message}
            isOpen={isInfoTooltipOpen}
          />
        </Route>
        <Route exact path='/'>
          {isLoggedIn ? <Redirect to='/main' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  )
}

export default App
