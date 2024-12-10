const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")
const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById("pokemonInfo")
const backBtn = document.getElementById("backBtn")
let query =""
async function fetchPokemonData(pokemonId){
    let endpoint = "https://pokeapi.co/api/v2/pokemon/"+pokemonId;
    const response = await fetch(endpoint);
    const pokemon = await response.json()
    return pokemon
}

function displayPokemon(pokemon){
    console.log(pokemon)
    let pokemonTypes = ""
    for(let i=0;i<pokemon.types.length;i++){
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name + " "
    }
    let pokemonAbilities = ""
    for(let i=0;i<pokemon.abilities.length;i++){
        pokemonAbilities = pokemonAbilities + pokemon.abilities[i].ability.name + " "
    }
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML = `
    <h2 class="name">${pokemon.name}</h2>
    <h3 class="idNumber">${pokemon.id}</h3>  
    <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
    `
    // <h3>Habilidad</h3>
    // <p class="abilities">${pokemonAbilities}</p>
    // <p>${pokemon.base_experience}</p>
    // <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
    // <h3>Tipos de Pokemon</h3>
    // <p>${pokemonTypes}</p>
    pokemonCard.addEventListener("click",()=>{
        console.log("click")
        showPokemonDetail(pokemon)
    })
    pokemonList.appendChild(pokemonCard)
}

function showPokemonDetail(pokemon){
    pokemonList.style.display="none" 
    pokemonDetail.style.display="block";
    let pokemonMoves=""
    for(let i=0;i<pokemon.moves.length;i++){
        pokemonMoves = pokemonMoves + `<li> ${pokemon.moves[i].move.name } </li>`
    }
    let pokemonStats = ""
    for(let i=0;i<pokemon.stats.length;i++){
        pokemonStats = pokemonStats + `<li> ${pokemon.stats[i].stat.name}: + ${pokemon.stats[i].base_stat} </li>`
    }
    let pokemonTypes = ""
    for(let i=0;i<pokemon.types.length;i++){
        pokemonTypes = pokemonTypes + `<li> ${pokemon.types[i].type.name} </li>`
    }
    let pokemonAbilities = ""
    for(let i=0;i<pokemon.abilities.length;i++){
        pokemonAbilities = pokemonAbilities + `<li> ${pokemon.abilities[i].ability.name } </li>`
    }
  
    pokemonInfo.innerHTML = `
    <h2 class="name">${pokemon.name}</h2> 
    <h3 class="idNumber">${pokemon.id}</h3> 
    <h3>Habilidad</h3>
    <ul class="abilities">${pokemonAbilities}</ul>
    <h3>Experiencia</h3>
    <p>${pokemon.base_experience}</p> 
    <img class= "image" src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}"></img>
    <h3>Tipos de Pokemon</h3>
    <ul>
    ${pokemonTypes}
    </ul>
    <h3>Pokemon Stats</h3>
    <ul>
    ${pokemonStats}
    </ul>
    <h3>Pokemon Moves</h3>
    <ul>
    ${pokemonMoves}
    </ul> 
    `
}
backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display="none"
    pokemonList.style.display="block"
})

searchInput.addEventListener("input",(e)=>{
    query = e.target.value
})
async function searchPokemon(){
    try{
        const pokemon =await fetchPokemonData (query)
        showPokemonDetail(pokemon)
    }catch(error) {
        alert("Pokemon no encontrado, intenta de nuevo")
    }

    
}
searchBtn.addEventListener("click",()=>searchPokemon())


async function loadPokedex(){
    for (let i=1;i<2;i++){
        const pokemon = await fetchPokemonData(i)
    displayPokemon(pokemon)
    }
    
    
}
   
loadPokedex()
