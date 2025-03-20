import { useEffect, useState } from "react";
import {getColorPokemon} from "../services/api.js";

import "../css/PokemonCard.css";

function PokemonCard({ pokemonData }) {
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [pokemonColor, setPokemonColor] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const promises = pokemonData.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return response.json();
                });
                const results = await Promise.all(promises);
                setPokemonInfo(results);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
            }
        };

        if (pokemonData.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonData]);



    /*function getPokemonColor(pokemon) {
        pokemon.map(async (element) => {
            const color = await getColorPokemon(element.id);
            console.log(color);
            setPokemonColor(color);
        })
    }

    getPokemonColor(pokemonInfo);*/

    //TODO: Fix the color of the button tag
    //TODO: add weaknesses and strengths




    const getStat = (pokemon, statName) => {
        const stat = pokemon.stats.find((stat) => stat.stat.name === statName);
        return stat ? stat.base_stat : 'N/A';
    };

    const getTypes = (pokemon) => {

        return pokemon.types.map((type) => capitalizeFirstLetter(type.type.name)).slice(0,1);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div>
            {pokemonInfo.map((pokemon, index) => (
                <div className="pokemon-card" key={index}>
                    <div className="pokemon-card-img">
                        <img src={pokemon.sprites.other['official-artwork'].front_default}
                             alt={pokemon.name}/>
                    </div>
                    <div className="pokemon-info">
                    <div className="pokemon-name-type">
                            <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
                            <button className={{backgroundColor : pokemonColor}}>{getTypes(pokemon)}</button>
                        </div>
                        <div className="pokemon-stats">
                            <p>HP {getStat(pokemon, 'hp')}</p>
                            <p>Wh {pokemon.weight}</p>
                            <p>Def {getStat(pokemon, 'defense')}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PokemonCard;
