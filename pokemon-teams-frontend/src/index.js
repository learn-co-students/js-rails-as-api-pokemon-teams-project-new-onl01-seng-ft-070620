const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function trainerHTML(trainers){
  trainers.forEach(trainer => {
    let pokeString = ""
    trainer.pokemons.forEach(pokemon => {
      pokeString += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
    main.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>${pokeString}</ul></div>`
  })
}

function addPokemon(pokemon){
  main.children[pokemon.trainer_id - 1].lastElementChild.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}


document.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL)
    .then(r => r.json())
    .then(trainerHTML)

  main.addEventListener('click', (e) => {
    if (e.target.dataset.trainerId !== undefined) {
      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainer_id: e.target.dataset.trainerId
        })
      })
        .then(r => r.json())
        .then(addPokemon)
    }
    if (e.target.dataset.pokemonId !== undefined){
      e.target.parentElement.remove()
      fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {method :"DELETE"})
    }
  })
})