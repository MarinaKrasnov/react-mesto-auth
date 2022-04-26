import React from 'react'
import plus from '../images/Vector-3.svg'
import pen from '../images/Vector-2.svg'
import api from '../utils/API.js'
import Card from './Card.js'
function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()
  const [cards, setCards] = React.useState([])
  React.useEffect(() => {
    api
      .getProfileInfo()
      .then(userData => {
        /*   myId = userData._id */
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
      })
      .catch(err => {
        console.log(`Request for data from server is failed.${err}`)
      })
  }, [userName, userAvatar, userDescription])
  React.useEffect(() => {
    api.getCards().then(cards => {
      setCards(cards)
    })
  }, [])
  return (
    <div className='Main'>
      <main className='content'>
        <div className='profile'>
          <div className='profile__container'>
            <div
              className='profile__avatar'
              style={{ backgroundImage: `url(${userAvatar})` }}
              onClick={onEditAvatar}
            >
              <div className=' profile__overlay' arialabel='Обновить'></div>{' '}
            </div>{' '}
            <div className='profile__info'>
              <div className='profile__titleicon' onClick={onEditProfile}>
                <h1 className='profile__title'>{userName}</h1>{' '}
                <button
                  type='button'
                  className='button'
                  arialabel='Кнопка редактирования'
                >
                  <img
                    src={pen}
                    alt='Иконка редактирования'
                    className=' profile__icon'
                  />{' '}
                </button>{' '}
              </div>{' '}
              <p className='profile__subtitle'>{userDescription}</p>{' '}
            </div>{' '}
          </div>{' '}
          <button className='button' arialabel='Кнопка добавления'>
            <img
              src={plus}
              alt='Иконка добавления'
              className='profile__add-button'
              onClick={onAddPlace}
            />{' '}
          </button>{' '}
        </div>{' '}
        <section className='cards'>
          {cards.map((item, i) => (
            <Card onCardClick={onCardClick} item={item} key={i} />
          ))}
        </section>
      </main>
    </div>
  )
}
export default Main
