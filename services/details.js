async function detail() {
    let index = 1;
    let URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${index}/`;
    let dataPokemon = await initiatePokemon(URL_POKEMON);
    showHeader();
    showDetail(dataPokemon);

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
                            <li><a href="../public/index.html">Home</a></li>
                            <li><a href="">Favourites</a></li>
                        <nav><ul>`;

        document.querySelector('.header').innerHTML += template;
    }

    function showDetail(dataPokemon) {
        let template = '';

        dataPokemon.results.forEach((item) => {
            // console.log(dataPokemon);
            template += `
                <li>
                    <a href= "">${item.url}</a>
                </li>`;
        });

        template += `</ul></nav>`;

        document.querySelector('.pokemon-detail').innerHTML = template;
    }
}
document.addEventListener('DOMContentLoaded', detail);
