async function app() {
    const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=25&offset=0';
    const data = await initiatePokemon();
    showPokemon(data);

    async function initiatePokemon() {
        const response = await fetch(URL_POKEMON);
        return response.json();
    }

    function showPokemon(data) {
        console.log(data);
        const items = data.results;
        let template = '';
        template += `<h1>Pokémon</h1>
                        <img src="./pokemon-logo.svg" alt="Pokemon Logo">
                        <nav>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Favourites</a></li>
                        <nav><ul>`;

        items.forEach((itemPokemon) => {
            template += `
                <li>
                    <a href= "">${itemPokemon.name}</a>
                </li>`;
        });

        template += `</ul></nav>`;
        document.querySelector('.pokemon-list').innerHTML += template;
    }

    async function nextButton(index) {
        const URL_POKEMON =
            'https://pokeapi.co/api/v2/pokemon?limit=25&offset=0';
        const btn = await fetch(URL_POKEMON);
        return (btn += 25);
    }
    document
        .querySelectorAll('#next-page')
        .addEventListener('click', nextButton());
}

document.addEventListener('DOMContentLoaded', app);
