import React from 'react'
function Card ({ item, onCardClick }) {
  function handleClick () {
    onCardClick(item)
  }
  console.log(handleClick)
  return (
    <article className='card' aria-label='Карточка' key={item._id}>
      <img
        className='card__image'
        src={item.link}
        /*        style={{ backgroundImage: `url(${item.link})` }} */
        alt={`Виды на ${item.name}`}
        onClick={handleClick}
      />
      <button
        type='button'
        className='button card__button-delete'
        aria-label='Кнопка удаления карточки'
      />
      <div className='card__info'>
        <h3 className='card__text'>{item.name}</h3>
        <input type='hidden' name='id' defaultValue />
        <div className='card__likes'>
          <button
            type='button'
            className='button card__button-like '
            aria-label='Кнопка лайк'
          ></button>
          <p className='card__number-likes'>0</p>
        </div>
      </div>
    </article>
  )
}
export default Card
