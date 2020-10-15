const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function listPokemonTeams() {
    fetch(TRAINERS_URL)
        .then(r => r.json())
        .then(trainersObj => {
            for (const trainer of cleanTrainers(trainersObj)) {
                addTeam(trainer)
            }
        })
}

function cleanTrainers(trainersObj) {
    let cleanedTrainers = []
    for (const trainer of trainersObj.data) {
        cleanedTrainers.push(trainer.attributes)
    }
    return cleanedTrainers
}

function addTeam(trainer) {
    const teamCard = document.querySelector('main').appendChild(document.createElement('div'))
    const trainerNameP = teamCard.appendChild(document.createElement('p'))
    const addPokemonBtn = teamCard.appendChild(document.createElement('button'))
    const teamUl = teamCard.appendChild(document.createElement('ul'))
    trainerNameP.textContent = trainer.name
    addPokemonBtn.textContent = "Add Pokemon"
    addPokemonBtn.addEventListener("click", addPokemonToTeam)
    for (const pokemon of trainer.pokemons) {
        addPokemonToCard(pokemon, teamUl)
    }
    teamCard.setAttribute('class', 'card')
    teamCard.dataset.id = trainer.id
    addPokemonBtn.dataset.trainerId = trainer.id
}

function addPokemonToTeam() {
    const teamCard = this.parentElement
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({pokemon: {trainer_id: teamCard.dataset.id}})
    }
    fetch(POKEMONS_URL, options)
        .then(r => r.json())
        .then(pokemonObj => {
            if (pokemonObj.message != 'team full') {
                addPokemonToCard(pokemonData(pokemonObj), teamCard.querySelector('ul'))
            } else { alert("That team is already full!")}
        })
}

function pokemonData(obj) {
    return obj.data.attributes
}

function addPokemonToCard(pokemon, teamUl) {
    const pokemonLi = teamUl.appendChild(document.createElement('li'))
    const releaseBtn = document.createElement('button')
    pokemonLi.innerText += `${pokemon.nickname} (${pokemon.species})`
    releaseBtn.setAttribute('class', 'release')
    releaseBtn.dataset.pokemonId = pokemon.id
    releaseBtn.innerText = "Release"
    pokemonLi.appendChild(releaseBtn)
    releaseBtn.addEventListener('click', deletePkmn)
}

function deletePkmn() {
    const pkmnLi = this.parentElement
    options = {
        method: "DELETE"
    }
    fetch(`http://localhost:3000/pokemons/${this.dataset.pokemonId}`, options)
        .then(r => r.json())
        .then(respObj => {
            if (respObj.message == 'success') {
                pkmnLi.remove()
            } else { alert(respObj.message) }
        })
}

document.addEventListener('DOMContentLoaded', () => {
    listPokemonTeams()
})