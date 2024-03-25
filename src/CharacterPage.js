import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import "./CharacterPage.css"
function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const {id}=useParams()

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(json => setCharacter(json))
      .catch(error => console.error(error));
  }, [id]);
  if (!character){
    return(
      <div>not found</div>
    )
  }

  return (
    <div className='character-page-container'>
      <img className='character-page-image' src={character.image}/>
      <div className='character-page-content'>
        <div className='character-page-name'>{character.name}</div>
        <div className='character-page-status'>{character.status}</div>
        <div className='character-page-location'>{character.location.name}</div>
        <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        Go back (-1)
      </Link>      </div>
    </div>
  )
}

export default CharacterPage