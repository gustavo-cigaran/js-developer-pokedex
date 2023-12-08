const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const pokemonItem = document.getElementsByTagName('li');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonsItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
      <li id="pokemon" class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>`).join('');
    pokemonList.innerHTML += newHtml;

    Array.from(pokemonItem).forEach((element) => {
      element.addEventListener('click', () => {
        window.location.href = `detail.html?number=${element.dataset.id}`
      });
    });
  });
}

loadPokemonsItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonsItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonsItens(offset, limit)
  }
})