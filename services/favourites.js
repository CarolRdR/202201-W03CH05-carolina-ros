async function app() {
    let URL_POKEMON_LOCAL = `http://localhost:3000/Pokemon/`;
    let dataPokemon = await initiatePokemon(URL_POKEMON_LOCAL);
    showHeader();
    showList(dataPokemon);
    showButton();

    async function initiatePokemon() {
        const response = await fetch(URL_POKEMON_LOCAL);
        return response.json();
    }
    /*const pokemonDetails = await Promise.all(
        dataPokemon.map(async (pokemon) => {
            const response = await fetch(pokemon.sprites);
            return response.json();
        })
    );*/

    function showHeader() {
        let template = '';
        template += `<h1>Pokémon</h1>
                        <div class="pokemon-logo"><img src="./pokemon-logo.svg" alt="Pokemon Logo"></img></div>
                        <nav><ul class="pokemon__navigation">
                            <li class="pokemon__navigation-home"><a href="../public/index.html">Home</a></li>
                            <li class="pokemon__navigation-favourites"><a href="../public/favourites.html">Favourites</a></li>
                        </ul></nav>`;

        document.querySelector('.header').innerHTML += template;
    }

    function showList(dataPokemon) {
        let template = '';

        dataPokemon.forEach((item) => {
            // console.log(dataPokemon);
            template += `
                <li>
                <img src=${item.image}>
                    <a href= "../public/details.html?id=${item.url}">${item.name} </a>
                </li>`;
        });

        document.querySelector('.pokemon-favourite').innerHTML = template;
    }

    function showButton() {
        let template = '';
        template += `
                    <button class="previous-page">Previous Page</button>
                    <button class="next-page">Next Page</button>
                `;
        document.querySelector('.button-navegation').innerHTML = template;
    }

    async function buttonNext() {
        URL_POKEMON = dataPokemon.next;
        dataPokemon = await initiatePokemon(URL_POKEMON);
        showList(dataPokemon);
    }
    document.querySelector('.next-page').addEventListener('click', buttonNext);

    async function buttonPrevious() {
        URL_POKEMON = dataPokemon.previous;
        dataPokemon = await initiatePokemon(URL_POKEMON);
        showList(dataPokemon);
    }
    document
        .querySelector('.previous-page')
        .addEventListener('click', buttonPrevious);
}
document.addEventListener('DOMContentLoaded', app);
