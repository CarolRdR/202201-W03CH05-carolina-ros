async function app() {
    let index = 0;
    let limit;
    let URL_POKEMON = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${index}`;
    let dataPokemon = await initiatePokemon(URL_POKEMON);
    showHeader();
    showList(dataPokemon);
    showButton();

    async function initiatePokemon() {
        const response = await fetch(URL_POKEMON);
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
                        <img src="./pokemon-logo.svg" alt="Pokemon Logo"></img>
                        <nav><ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Favourites</a></li>
                        </ul></nav>`;
        template += `SHOWING ${URL_POKEMON.limit} OF 1118`;

        document.querySelector('.header').innerHTML += template;
    }

    function showList(dataPokemon) {
        let template = '';

        dataPokemon.results.forEach((item) => {
            // console.log(dataPokemon);
            template += `
                <li>
                <img src=${item.sprites}>
                    <a href= "../public/details.html?id=${item.url}">${item.name} </a>
                </li>`;
        });

        document.querySelector('.pokemon-list').innerHTML = template;
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
/*let buttonPrevious = document.querySelectorAll('.previous-page');

    buttonPrevious.forEach(function (e) {
        e.addEventListener('click', () => {
            buttonNext('transitioned').innerHTML += data.previous;
        });
    });*/

/*initiatePokemon.forEach((itemPokemon) => {
        let buttonNext = document.querySelectorAll('.next-page');
        buttonNext[itemPokemon].addEventListener('click', () => {
            buttonNext.innerHTML += template;
        });
    });*/
