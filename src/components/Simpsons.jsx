const Simpsons = ({ simpsons, onLikeToggle, deleteCharacter }) => {
  return simpsons.map((simpson) => {
    return (
      <>
        <div key={simpson.quote} className="character-card">
          <h2>{simpson.character}</h2>
          <div className={simpson.characterDirection}>
            <p>{simpson.quote}</p>
            <img src={simpson.image} alt={simpson.character}></img>
          </div>
          <button onClick={() => deleteCharacter(simpson.quote)}>Delete</button>
          <button onClick={() => onLikeToggle(simpson.quote)}>Like</button>
        </div>
      </>
    );
  });
};

export default Simpsons;
