const pokemonMain = document.getElementById('pokemon__detail');

const pokemonNumber = parseInt(getParameter('number'));

const pokemons = (number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`

  return fetch(url)
      .then(response => response.json())
      .then(convertPokeDetailToPokemon)
}

function getParameter(parameter) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(parameter)
}

async function getPokemonDescription(pokemonNumber) {
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}/`;

  try {
    const response = await fetch(speciesUrl)
    const speciesData = await response.json()
    const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
    return description
  } catch (error) {
    console.error('Erro ao obter dados da espécie do Pokémon:', error);
    return ''
  }
}

async function convertPokemonDetails(pokemon) {
  const description = await getPokemonDescription(pokemonNumber)

  pokemonMain.innerHTML = `
    <section class="pokemon__image">
      <img src="${pokemon.photo}" alt="${pokemon.name}">
      <div class="pokemon__name">
        <h1>${pokemon.name}</h1>
        <span>${pokemon.type} pokemon</span>
      </div>
    </section>
    <section class="details">
      <article class="details__list">
        <div class="details__item">
          <p>${pokemon.weight / 10}kg</p>
          <span>Weight</span>
        </div>
        <div class="details__item">
          <p>${pokemon.height / 10}m</p>
          <span>Height</span>
        </div>
        <div class="details__item">
          <p>${pokemon.attack}</p>
          <span>Attack</span>
        </div>
        <div class="details__item">
          <p>${pokemon.defense}</p>
          <span>Defense</span>
        </div>
      </article>
      <hr width="90%" noshade>
      <article class="details__description">
        <h4>Description</h4>
        <p>${description}</p>
      </article>
    </section>`
}
pokemons(pokemonNumber).then(convertPokemonDetails)