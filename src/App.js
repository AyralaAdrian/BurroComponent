import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function BurroComponent() {
  const [personajes, setPersonajes] = useState([]);
  const [idsSeleccionados, setIdsSeleccionados] = useState([]);
  const locations = personajes.map((perso) => perso.location.name); //duda
  
 
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then( (response) =>{
        setPersonajes(response.data.results)
      })
      .catch(() => console.warn("error")
      )
  }, []);

  return (
    <>
      <div className='container' >
        <div className='lista'> 
        {
        personajes.map(
          (psnj, index) => {
            //console.log(psnj.location.name)
            return (<p key={psnj.name} onClick={() => setIdsSeleccionados(prevState => {
            if(prevState.includes(psnj.id)){
              return idsSeleccionados;
            }
            else{
              return [...prevState, psnj.id];
            }
          })
          }>{index + 1} {psnj.name}</p>)})
        }
        </div>
        <FilterByLocation locations={locations} /> 
        <div> 
        {
        idsSeleccionados.map((id, index) => {return (<SinglePersonaje key={index} id={id} />)}) 
        }
        </div> 
      </div>
    </>   
  )
}

export function SinglePersonaje({id}) {
  const [personaje, setPersonaje] = useState({})
  useEffect(()=> { 
    axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => {
      setPersonaje(response.data)})
    .catch(console.err)
  }, [])

return(
  <div className='personajes'>
    <p>Personaje: {personaje.name}</p>
    <p>Species: {personaje.species}</p>
    <p>Status: {personaje.type}</p>
    <p>type: {personaje.type}</p>
    <p>Gender: {personaje.gender}</p>
  </div>
  );
};

export const FilterByLocation = ({locations}) => {
const [location, setLocation] = useState(locations)
  return(
    <div className='botones'>  
      {location.map(() => (<button>{locations}</button>))}
    </div>
  )
}

export default BurroComponent;
