const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
})

function fetchTrainers() {
    let url = 'http://localhost:3000/trainers'
    fetch(url)
    .then(resp => resp.json())
    .then(jsObj => displayTrainers(jsObj))
}

function displayTrainers(trainerData) {
    const card = document.getElementById('main-cards')
    for (let trainer of trainerData) {
        let div = document.createElement('div')
        card.appendChild(div)
            div.setAttribute('class' , "card")
            div.setAttribute('data-id' , trainer.id)
        let p = document.createElement('p')
            p.innerHTML = trainer.name
            div.appendChild(p)
        let button = document.createElement('button')
            button.setAttribute('data-trainer-id', trainer.id)
            button.innerHTML = "Add Pokemon"
            button.addEventListener("click", requestPokemon)
            div.appendChild(button)
        let ul = document.createElement('ul')
            div.appendChild(ul)
            for (let pokemon of trainer.pokemons) {
                displayPokemon(pokemon)
            }  
    }
}

function requestPokemon() {
    trainerId = Number(event.target.dataset.trainerId)

    let url = 'http://localhost:3000/pokemons'
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon: {"trainer_id": trainerId}
        })
    })
    .then(resp => resp.json())
    .then(jsObj => displayPokemon(jsObj))
}

function displayPokemon(pokemon) {
    const div = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)

    let li = document.createElement('li')
        li.innerText = `${pokemon.nickname} // ${pokemon.species}`
        let pokebutton = document.createElement('button')
            pokebutton.setAttribute('data-pokemon-id', pokemon.id)
            pokebutton.setAttribute('class', "release")
            pokebutton.innerText = "Release"
            pokebutton.addEventListener("click", removePokemon)
        li.appendChild(pokebutton)
    div.lastElementChild.appendChild(li)
}

function removePokemon() {
    pokemonId= event.target.dataset.pokemonId
    let url = `http://localhost:3000/pokemons/${pokemonId}`
    fetch(url, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(jsObj => deletePokemon(jsObj))
}

function deletePokemon(pokemon) {
    let pokeDelete = document.querySelector(`[data-pokemon-id="${pokemon.id}"]`)
    pokeDelete.parentElement.remove()
}
