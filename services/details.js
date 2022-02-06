async function app() {
    let id = window.location.href.split('=')[1];
    let URL_POKEMON = `${id}`;
    let dataPokemon = await initiatePokemon(URL_POKEMON, {
        mode: 'cors',
    });
    console.log(window.location.search.split('=')[1]);
    showHeader();
    showList(dataPokemon);
    addPokemon(dataPokemon);

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
                        <div class="pokemon-logo"><img src="./pokemon-logo.svg" alt="Pokemon Logo"></img></div>
                        <nav><ul class="pokemon__navigation">
                            <li><a class="pokemon__navigation-home" href="../public/index.html">Home</a></li>
                            <li><a class="pokemon__navigation-favourites" href="../public/favourites.html">Favourites</a></li>
                        </ul></nav>`;

        document.querySelector('.header').innerHTML += template;
    }

    function showList() {
        let template = '';
        template += `
        <h2>${dataPokemon.name}</h2>
        <div class="pokemon-images">
        <img class="pokemon-image" src="${dataPokemon.sprites.front_default}" alt="Pokemon shiny"></img>
        <img class="pokemon-image" src="${dataPokemon.sprites.front_shiny}" alt="Pokemon shiny"></img>
        </div>`;

        template += `
               <div class="pokemon-description">
                 <div class="characteristic weight">Weight: ${dataPokemon.weight}</div>
                 <div class="characteristic height">Height: ${dataPokemon.height}</div>
                 <div class="characteristic species">Species: ${dataPokemon.species.name}</div>
                 <div class="characteristic moves">Moves: ${dataPokemon.moves[0].move.name}</div>
               </div>`;

        template += `
        <div class="button-add-delete">
                    <button class="add-favourite">Add Favourite</button>
                    <button class="delete-favourite">Delete Favourite</button>
               </div>`;

        document.querySelector('.pokemon-detail').innerHTML = template;
    }

    async function addPokemon() {
        URL_POKEMON = dataPokemon.name;
        dataPokemon = await initiatePokemon(URL_POKEMON);

        showList(dataPokemon);
    }
    document
        .querySelector('.add-favourite')
        .addEventListener('click', handleAdd);

    /*async function deleteFavourite() {
        URL_POKEMON = dataPokemon;
        dataPokemon = await initiatePokemon(URL_POKEMON);
        showList(dataPokemon);
        console.log('delete');
    }
    document
        .querySelector('.delete-favourite')
        .addEventListener('click', deleteFavourite);*/

    function handleAdd() {
        const dataInfo = {};
        dataInfo.name = dataPokemon.name;
        console.log(dataInfo);

        fetch('http://localhost:3000/Pokemon/', {
            method: 'POST',
            body: JSON.stringify(dataInfo),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            mode: 'cors',
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => {
                console.log('Error:', error);
            });
    }
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
