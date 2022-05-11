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
function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  )
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  )
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
  }
  const [currentUser, setCurrentUser] = React.useState({})
  React.useEffect(() => {
    api
      .getProfileInfo()
      .then(userData => {
        setCurrentUser(userData)
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }, [])
  const [selectedCard, setSelectedCard] = React.useState(null)
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

  const [countLikes, setCountLikes] = React.useState(0)
  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      setCountLikes(isLiked ? card.likes.length-- : card.likes.length++)
    })
  }
  const [cards, setCards] = React.useState([])
  function handleCardDelete (card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards =>
        cards.filter(item => {
          return item._id !== card._id
        })
      )
      card.remove()
    })
  }
  React.useEffect(() => {
    api
      .getCards()
      .then(cards => {
        setCards(cards)
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }, [])
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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        handleCardLike={handleCardLike}
        handleCardDelete={handleCardDelete}
        cards={cards}
        countLikes={countLikes}
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
        title={'Вы уверены?'}
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
    </CurrentUserContext.Provider>
  )
}

export default App
