
export const getAllPokemon =async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1&offset=0');
    const data = await response.json();
    return data.results;
}

export const getColorPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const data = await response.json();
    return data.color.name;
}

export const getTypePokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemon}`);
    const data = await response.json();
    return data;
}