export async function app() {
    let index = 0;
    let URL_POKEMON = ` https://pokeapi.co/api/v2/pokemon?limit=25&offset=${index}`;
    let dataPokemon = await initiatePokemon(URL_POKEMON);
    showHeader();
    showList(dataPokemon);
    showButton();

    async function initiatePokemon() {
        const response = await fetch(URL_POKEMON);
        return response.json();
    }

    function showHeader() {
        let template = '';
        template += `<h1>Pokémon</h1>
                        <img src="./pokemon-logo.svg" alt="Pokemon Logo">
                        <nav>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Favourites</a></li>
                        <nav><ul>`;

        document.querySelector('.header').innerHTML += template;
    }

    function showList(dataPokemon) {
        let template = '';

        dataPokemon.results.forEach((item) => {
            template += `
                <li>
                    <a href= "">${item.name}</a>
                </li>`;
        });

        template += `</ul></nav>`;

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
        index += 25;
        URL_POKEMON = ` https://pokeapi.co/api/v2/pokemon?limit=25&offset=${index}`;
        let dataPokemon = await initiatePokemon(URL_POKEMON);
        showList(dataPokemon);
    }
    document.querySelector('.next-page').addEventListener('click', buttonNext);
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
