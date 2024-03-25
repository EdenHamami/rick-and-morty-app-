import React from 'react'
import { Link } from 'react-router-dom'
import './Character.css'
function Character({character}) {
  return (
    <div className='character-card-container'>
      <Link className="character-card-link" to={`${character.id}`}>
      <img className='character-card-image' src={character.image}/>
      <div className='character-card-content'>

        <div className='character-card-name'>{character.name}</div>
        <div className='character-card-location'>{character.location.name}</div>
        <div className='character-card-status'>{character.status}</div>


      </div>
      </Link>

    </div>
  )
}

export default Character