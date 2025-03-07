import PokeCard from "./components/PokeCard.jsx";
import {getAllPokemon} from "./services/api.js";
import './App.css'
import {useEffect} from "react";

function App() {

    useEffect( () => {

        const loadPokemon = async () => {
            try {
                const pokemon = await getAllPokemon();
                console.log(pokemon);
            } catch (error) {
                console.error(error);
            }
        }

        loadPokemon();

    }, []);

  return (
    <>
       <PokeCard />
    </>
  )
}

export default App
