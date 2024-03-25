import React, { useEffect, useState } from 'react'
import CharactersList from './CharactersList';
import './HomePage.css'
function HomePage() {
  const [characters,setCharacters]=useState(null)
  const [relevantCharacters,setRelevantCharacters]=useState(null)
  const [searchQuery,setSearchQuery]=useState('')
  const[filteredLocations,setFilteredLocations]=useState([])
  const [locations,setLocations]=useState([])
const [order,setOrder]=useState("name ↓")

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(json => {
        setCharacters(json.results);
        let locations = Array.from(new Set(json.results.map(character => 
          character.location.name)));
        setLocations(locations);
      })
      .catch(error => console.error(error));
  }, []);
  
  useEffect(()=>{
    if (characters){
      let updatedCharacters=[...characters]
      updatedCharacters=updatedCharacters.filter(character=>character.name.toLowerCase().startsWith(searchQuery.toLowerCase()))

      if (filteredLocations.length>0){
        updatedCharacters=updatedCharacters.filter(character=>filteredLocations.includes(character.location.name))
        
      }

      const sorter={
        "name ↓":(updatedCharacters)=>(updatedCharacters .sort((a, b) => a.name.localeCompare(b.name))),
        "name ↑":(updatedCharacters)=>(updatedCharacters .sort((a, b) => a.name.localeCompare(b.name)).reverse()),
        "id":(updatedCharacters)=>(updatedCharacters.sort((a, b) => a.age - b.age)),
      }
      updatedCharacters=sorter[order](updatedCharacters)

      setRelevantCharacters(updatedCharacters)


    }

  },[searchQuery,filteredLocations,order,characters])
  if (!characters){
    return(
      <div>loading...</div>
    )
  }
function handleSearch(e){
  setSearchQuery(e.target.value)
}
function handleFilter(selectedLocation){
  if (filteredLocations.includes(selectedLocation)){
    let updatedLocations=filteredLocations.filter(location=>(location!==selectedLocation))
    setFilteredLocations(updatedLocations)

  }
  else{
    let updatedLocations=[...filteredLocations,selectedLocation]
    console.log(updatedLocations);
    setFilteredLocations(updatedLocations)

  }
}

function handleOrder(selectedOrder){
  setOrder(selectedOrder)
}
  return (
<>
      {relevantCharacters ?
        <div className='home-page-container'>

      <div className='left-side'>
        {locations.map(location=>(
          <div 
          key={location}
          className={`filter-item ${filteredLocations.includes(location) ?"selected" :""}`}
          onClick={()=>handleFilter(location)}
          >{location}</div>
        ))}
      </div>
      <div className='right-side'>
<div className='right-side-top'>
<input className='search' type='text' placeholder='search character' onChange={handleSearch}/>
<select className="order-by" onClick={(e)=>handleOrder(e.target.value)}>
  <option  value="name ↓">name ↓</option>
  <option value="name ↑">name ↑</option>
  <option value="id">id</option>

</select>
</div>
<div className='right-side-bottom'>
<CharactersList relevantCharacters={relevantCharacters}/>
</div>
</div>
</div>

: 'Loading...'}
</>
  )
  
}

export default HomePage