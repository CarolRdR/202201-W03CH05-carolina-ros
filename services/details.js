async function app() {
    let id = window.location.href.split('=')[1];
    let URL_POKEMON = `${id}`;
    let dataPokemon = await initiatePokemon(URL_POKEMON);
    console.log(window.location.search.split('=')[1]);
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
        template += `<h1>Pokémon </h1>
                        <img src="./pokemon-logo.svg" alt="Pokemon Logo">
                        <nav><ul>
                            <li><a href="../public/index.html">Home</a></li>
                            <li><a href="">Favourites</a></li>
                        </ul></nav>`;

        document.querySelector('.header').innerHTML += template;
    }

    function showList() {
        let template = '';
        template += `
        <h2>${dataPokemon.name}</h2>
        <img src="${dataPokemon.sprites.front_default}" alt="Pokemon shiny"></img>`;

        template += `

               <span class="weight">Weight:${dataPokemon.weight}</span>
               <span class="height">Height: ${dataPokemon.height}</span>
               <span class="species">Species: ${dataPokemon.species.name}</span>
               <span class="moves">Moves: ${dataPokemon.moves[0].move.name}</span>`;

        document.querySelector('.pokemon-detail').innerHTML = template;
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

/*async function detail() {
    const fetchData = async (id) => {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${id}/`
            );
            const data = await response.json();
            showCard(data);
        } catch (error) {
            console.log(error);
            showCard(data);
        }
    };
    const showCard = (pokemon) => {
        let template = '';
        console.log(pokemon);

        fetchData.forEach((id) => {
            template += `
            <div class="pokemon-card"></div>
                <li>
                    <a href= "../public/details.html?id=${id}">Name: ${id.name}</a>
                </li>`;
        });
    };

    showHeader();
    showDetail(fetchData);
    addButton();
    //showDetail(dataPokemon);

    // console.log(window.location.search.split('=')[1]);

    function showHeader() {
        let template = '';
        template += `<h1>Pokémon</h1>
                        <img src="./pokemon-logo.svg" alt="Pokemon Logo">
                        <nav><ul>
                            <li><a href="../public/index.html">Home</a></li>
                            <li><a href="">Favourites</a></li>
                        </ul></nav>`;

        document.querySelector('.header').innerHTML += template;
    }

    function showDetail(fetchData) {
        let template = '';

        fetchData.forEach((id) => {
            template += `
            <div class="pokemon-card"></div>
                <li>
                    <a href= "../public/details.html?id=${id}">Name: ${id.name}</a>
                </li>`;
        });

        document.querySelector('.pokemon-detail').innerHTML += template;
    }

    function addButton() {
        let template = '';
        template += `
                    <button class="add-pokemon">Add To Favourites</button>
                    <button class="delete-pokemon">Delete From Favourites</button>
                `;
        document.querySelector('.button-add').innerHTML += template;
    }

    /*async function buttonNext() {
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
}
document.addEventListener('DOMContentLoaded', detail);*/
