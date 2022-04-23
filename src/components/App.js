import React from 'react'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import '../index.css'
function App () {
  return (
    <div className='App'>
      <>
        <Header />
        <Main />
        <Footer />
        <div className='overlay overlay-profile'>
          <form className='overlay__form' name='form-profile' noValidate=''>
            <fieldset className='popup '>
              <h2 className='popup__maintitle'>Редактировать профиль</h2>
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
              <button type='button' className='button close-btn' />
            </fieldset>
          </form>
        </div>
        <div className='overlay overlay-add '>
          <form className='overlay__form' name='new-place' noValidate=''>
            <fieldset className='popup '>
              <h2 className='popup__maintitle'>Новое место</h2>
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
              <button type='button' className='button close-btn' />
            </fieldset>
          </form>
        </div>
        <div className='overlay overlay-image '>
          <div className='overlay-image__content '>
            <img
              src='#'
              className='overlay-image__image'
              alt='Увеличенное фото'
            />
            <button type='button' className='button close-btn ' />
            <p className='overlay-image__capture' />
          </div>
        </div>
        <div className='overlay overlay-ausure'>
          <form className='popup popup_type_ausure ' name='ausure'>
            <h2 className='popup__maintitle'>Вы уверены?</h2>
            <input type='hidden' name='id' defaultValue='' />
            <button
              type='submit'
              className='popup__submit popup__submit_size_s'
              aria-label='Кнопка согласия'
            >
              Да
            </button>
            <button type='button' className='button close-btn' />
          </form>
        </div>
        <div className='overlay overlay-avatar '>
          <form className='overlay__form' name='avatar-form' noValidate=''>
            <fieldset className='popup popup_type_avatar '>
              <h2 className='popup__maintitle'>Обновить аватар</h2>
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
              <button type='button' className='button close-btn' />
            </fieldset>
          </form>
        </div>{' '}
      </>{' '}
    </div>
  )
}

export default App
