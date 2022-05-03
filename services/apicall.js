export async function app() {
    let index = 0;
    let limit;
    let URL_POKEMON = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${index}`;
    let dataPokemon = await initiatePokemon(URL_POKEMON);
    // let pokemon = dataPokemon[dataPokemon.length - 1];

    let offset = dataPokemon.next.split('=')[1].split('&')[0];

    showHeader();
    showList(dataPokemon);
    showButton();

    async function initiatePokemon() {
        const response = await fetch(URL_POKEMON);
        return response.json();
        //     const pokemonDetails = await Promise.all(
        //         dataPokemon.map(async (pokemon) => {
        //             const response = await fetch(pokemon.sprites);
        //             return response.json();
        //         })
        //     );
    }

    function showHeader() {
        let template = '';
        template += `<h1>Pokémon</h1>
                        <div class="pokemon-logo"><img src="./pokemon-logo.svg" alt="Pokemon Logo"></img></div>
                        <nav><ul class="pokemon__navigation">
                            <li><a class="pokemon__navigation-home" href="../public/index.html">Home</a></li>
                            <li><a class="pokemon__navigation-favourites"href="../public/favourites.html">Favourites</a></li>
                        </ul></nav>`;
        template += `<div class="pokemon-showing">SHOWING ${offset} OF 1126</div>`;

        document.querySelector('.header').innerHTML = template;
    }

    function showList(dataPokemon) {
        let template = '';

        dataPokemon.results.forEach((item) => {
            template += `
                <li>
                    <a class ="pokemon-list__name" href= "../public/details.html?id=${item.url}">${item.name} </a>
                </li>`;
            let iterate = item.length;
        });

        document.querySelector('.pokemon-list').innerHTML = template;
    }

    function showButton() {
        let template = '';
        template += `
                           <button class="previous-page">Previous Page</button>
                           <button class="next-page">Next Page</button>
                      `;
        document.querySelector('.button-navigation').innerHTML = template;
    }

    async function buttonNext() {
        URL_POKEMON = dataPokemon.next;
        dataPokemon = await initiatePokemon(URL_POKEMON);
        offset = dataPokemon.next.split('=')[1].split('&')[0];
        let iterate = dataPokemon.results.length;
        console.log('2', iterate);
        showList(dataPokemon);
        showHeader();
    }
    document.querySelector('.next-page').addEventListener('click', buttonNext);

    async function buttonPrevious() {
        URL_POKEMON = dataPokemon.previous;
        console.log(dataPokemon.previous);
        offset = +dataPokemon.previous.split('=')[1].split('&')[0] + 20;
        dataPokemon = await initiatePokemon(URL_POKEMON);
        showList(dataPokemon);
        showHeader();
    }
    document
        .querySelector('.previous-page')
        .addEventListener('click', buttonPrevious);
}
document.addEventListener('DOMContentLoaded', app);
