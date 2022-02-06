async function app() {
    let fetchId = [];
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

    function showButton() {
        let template = '';
        template += `
                    <button class="previous-page">Previous Page</button>
                    <button class="next-page">Next Page</button>
                `;
        document.querySelector('.button-navegation');
    }

    function showList(dataPokemon) {
        let template = '';

        dataPokemon.forEach((item, index) => {
            template += `
                <li>
                <img src=${item.image}>
                    <a href= "../public/details.html?id=${item.url}">${item.name} </a>
                </li>`;
            template += `
                <div class="button-delete">
                    <button class="delete-favourite">Delete Favourite</button>
                </div>`;

            fetchId.push({ name: item.name, id: item.id, index: index });
        });
        console.log(fetchId);
        let idDelete = '';
        document.querySelector('.pokemon-delete').innerHTML = template;
        let buttonDelete = document.querySelectorAll('.delete-favourite');
        buttonDelete.forEach(function (e, i) {
            e.addEventListener('click', () => {
                if (fetchId[i].index === i) {
                    idDelete = fetchId[i].id;
                    console.log(idDelete);
                }

                //funcion que borra por id
                fetch('http://localhost:3000/Pokemon/' + idDelete, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => console.log(data))
                    .catch((error) => {
                        console.log('Error:', error);
                    });
                console.log('DELETEE', index);
            });
        });
    }
    /*deleteItems(id) {
        buttonDelete.splice(id, 1);
        //this.tasks.filter((item) => item.id != id);
        localStorage.setItem(STORE_NAME, JSON.stringify(buttonDelete));
        location.reload();
       }*/

    /*async function deleteFavourite() {
        URL_POKEMON = dataPokemon;
        dataPokemon = await initiatePokemon(URL_POKEMON_LOCAL);
        showList(dataPokemon);
    }*/
    /*document
        .querySelectorAll('.delete-favourite')
        .addEventListener('click', handleDelete);*/

    /*function handleDelete() {
        console.log('delete');
        const dataInfo = {};
        dataInfo.id = dataPokemon.id;
        dataInfo.name = dataPokemon.name;
        dataInfo.url = url_pokemon;
        dataInfo.image = dataPokemon.sprites.front_default;

        fetch('http://localhost:3000/Pokemon/${id}', {
            method: 'DELETE',

            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            mode: 'cors',
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.success) {
                    let category = state.category.filter(
                        (dataInfo) =>
                            dataInfo.URL_POKEMON_LOCAL !== URL_POKEMON_LOCAL
                    );
                    removeItem({ category });
                    return dataInfo;
                }
            });
    }*/
}

document.addEventListener('DOMContentLoaded', app);
