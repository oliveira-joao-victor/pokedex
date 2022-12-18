const list = document.getElementById('list');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 1154;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li>
            <article class="pokemons ${pokemon.type}">
                <div class="identificators">
                    <span class="names">${pokemon.name}</span>
                    <span class="ids">#${pokemon.number}</span>
                </div>
                
                <div class="details">
                    <ol class="types_list">
                        ${pokemon.types.map((type) => `<li class="types ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
            </article>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        list.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})