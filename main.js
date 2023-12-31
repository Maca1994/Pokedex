const listaPokemon = document.querySelector("#listaPokemon");  
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
function isGoogleQuery(r){if(!r)return!1;try{if(new URL(r).host.startsWith("www.google."))return!0}catch(r){return!1}return!1}function isSupportedBrowserVersion(){const r=navigator.userAgent.match(/Chrome\/([0-9]+)/);return!(r&&r.length>=2)||+r[1]>=SETTINGS.SUPPORTED_VERSION}


for(let i = 1; i <= 151; i++){
    fetch (URL + i)
        .then((response) => response.json())
        .then(data =>mostrarPokemon(data))
}

function mostrarPokemon(data) {

    let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = data.id.toString();
    if (pokeId.length ===1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2 ) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML=  `
        <p class="pokemon-id-back">#${data.id}</p>
        <div class="pokemon-imagen">
            <img src="${data.sprites.other["official-artwork"]}" alt="${data.name}>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${data.id}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
            ${tipos}
            </div>
            <div class="Pokemon-stats">
                <p class="stat">${data.heigh}m</p>
                <p class="class">${data.weight}kg</p> 
            </div>
        </div>
    `;

    listaPokemon.append(div);

}

botonesHeader.forEach(boton => boton.addEventListtener("click", (event) =>{
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for(let i = 1; i <= 151; i++){
        fetch (URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {

                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                    }
                }
                
            })
    }
}))