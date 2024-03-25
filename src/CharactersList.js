import React from "react";
import Character from "./Character";
import "./CharactersList.css"
function CharactersList({relevantCharacters}){
    return(
        <div className="characters-list-container">
            {relevantCharacters.map(character=>(
                <Character key={character.id} character={character}/>
            ))}

        </div>
    )
}

export default CharactersList;