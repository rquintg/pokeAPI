import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard.jsx";
import {getAllPokemon} from "./services/api.js";
import './App.css'


function App() {

    const [pokemonData, setPokemonData] = useState([]);

    useEffect( () => {

        const loadPokemon = async () => {
            try {
                const pokemon = await getAllPokemon();
                setPokemonData(pokemon);
            } catch (error) {
                console.error(error);
            }
        }

        loadPokemon();

    }, []);

  return (
    <>
       <PokemonCard
              pokemonData={pokemonData}
       />
    </>
  )
}

export default App
