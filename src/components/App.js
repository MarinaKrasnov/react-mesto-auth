import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
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
  const [selectedCard, setSelectedCard] = React.useState(null)
  function handleCardClick (card) {
    setSelectedCard(card)
  }
  return (
    <>
      <Header />
      <Main
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id='name'
          type='text'
          name='user'
          className='popup__input popup__input_value_name'
          placeholder='Имя'
          minLength={2}
          maxLength={40}
          required=''
        />
        <span id='name-error' className='popup__error' />
        <input
          id='profession'
          type='text'
          name='profession'
          className='popup__input popup__input_value_profession'
          placeholder='Профессия'
          minLength={2}
          maxLength={200}
          required=''
        />
        <span id='profession-error' className='popup__error' />
        <button
          type='submit'
          className='popup__submit'
          aria-label='Кнопка сохранить'
        >
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        name={'add'}
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id='name-place'
          type='text'
          name='name'
          className='popup__input popup__input_type_place-name'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          required=''
        />
        <span id='name-place-error' className='popup__error' />
        <input
          id='url'
          type='url'
          name='link'
          className='popup__input popup__input_type_link'
          placeholder='Ссылка на картинку'
          required=''
        />
        <span id='url-error' className='popup__error' />
        <input type='hidden' name='id' defaultValue='' />
        <button
          type='submit'
          className='popup__submit popup__submit-add'
          aria-label='Кнопка создать'
        >
          Создать
        </button>
        <input type='hidden' name='id' defaultValue='' />
      </PopupWithForm>
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
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type='hidden' name='id' defaultValue='' />
        <label>
          <input
            id='avatar'
            type='url'
            name='avatar'
            className='popup__input popup__input_type_avatar'
            placeholder='Ссылка на картинку'
            required=''
          />
          <span
            id='avatar-error'
            className='popup__error popup__error_size_s'
          />
        </label>
        <button
          type='submit'
          className='popup__submit popup__submit-add'
          aria-label='Кнопка создать'
        >
          Сохранить
        </button>
      </PopupWithForm>
    </>
  )
}

export default App
