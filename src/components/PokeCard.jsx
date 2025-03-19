import { useEffect, useState } from "react";

import "../css/PokeCard.css";

function PokeCard({ pokemonData }) {
    const [pokemonInfo, setPokemonInfo] = useState([]);

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

    console.log(pokemonInfo);

    const getStat = (pokemon, statName) => {
        const stat = pokemon.stats.find((stat) => stat.stat.name === statName);
        return stat ? stat.base_stat : 'N/A';
    };

    const getTypes = (pokemon) => {
        return pokemon.types.map((type) => type.type.name).slice(0,1);
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
                            <h3>{pokemon.name}</h3>
                            <p>{getTypes(pokemon)}</p>
                        </div>
                        <div className="pokemon-stats">
                            <p>HP: {getStat(pokemon, 'hp')}</p>
                            <p>Attack: {getStat(pokemon, 'attack')}</p>
                            <p>Defense: {getStat(pokemon, 'defense')}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PokeCard;
