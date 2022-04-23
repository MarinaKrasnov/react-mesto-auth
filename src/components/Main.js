import React from 'react'
import plus from '../images/Vector-3.svg'
import pen from '../images/Vector-2.svg'
import PopupWithForm from './PopupWithForm.js'

function Main () {
  const handleEditAvatarClick = () => {
    document.querySelector('.overlay-avatar').classList.add('overlay-active')
    console.log(document.querySelector('.overlay-avatar'))
  }
  const handleEditProfileClick = () => {
    document.querySelector('.overlay-profile').classList.add('overlay-active')
  }
  const handleAddPlaceClick = () => {
    document.querySelector('.overlay-add').classList.add('overlay-active')
  }
  return (
    <div className='Main'>
      <>
        <main className='content'>
          <div className='profile'>
            <div className='profile__container'>
              <div className='profile__avatar'>
                <div className=' profile__overlay' arialabel='Обновить'>
                  {' '}
                </div>{' '}
              </div>{' '}
              <div className='profile__info'>
                <div
                  className='profile__titleicon'
                  onClick={handleEditProfileClick}
                >
                  <h1 className='profile__title'> Жак - Ив Кусто </h1>{' '}
                  <button
                    type='button'
                    className='button'
                    arialabel='Кнопка редактирования'
                  >
                    <img
                      src={pen}
                      alt='Иконка редактирования'
                      className=' profile__icon'
                      onClick={handleEditAvatarClick}
                    />{' '}
                  </button>{' '}
                </div>{' '}
                <p className='profile__subtitle'> Исследователь океана </p>{' '}
              </div>{' '}
            </div>{' '}
            <button className='button' arialabel='Кнопка добавления'>
              <img
                src={plus}
                alt='Иконка добавления'
                className='profile__add-button'
                onClick={handleAddPlaceClick}
              />{' '}
            </button>{' '}
          </div>{' '}
          <section className='cards'> </section>{' '}
        </main>
      </>{' '}
    </div>
  )
}

export default Main
