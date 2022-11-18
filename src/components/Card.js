function Card({card, onCardClick}) {
  return (
    <article className="element">
      <button className="image-button" type="button" onClick={() => onCardClick(card)}>
        <img className="element__image" src={card.link} alt={card.name}/>
      </button>
      <button className="delete-button" type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className="like-button" type="button"></button>
          <h3 className="element__like-count">{card.likes.length}</h3>
        </div>
      </div>
    </article>
  )
}
export default Card;