const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', loadTrainers) 

function loadTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => {
    trainers.forEach(trainer => renderTrainer(trainer))
  })
}

function renderTrainer(trainer) {
  const div = document.createElement('div')
  const p = document.createElement('p')
  const button = document.createElement('button')
  const ul = document.createElement('ul')
  div.className = "card"
  div.setAttribute('data-id', trainer.id)
  p.innerText = trainer.name
  button.setAttribute('data-trainer-id', trainer.id)
  button.innerText = "Add Pokemon"
  button.addEventListener('click', addPokemon)

  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)
  main.appendChild(div)
  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon) {
  let ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
  const li = document.createElement('li')
  const button = document.createElement('button')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  button.className = "release"
  button.setAttribute('data-pokemon-id', pokemon.id)
  button.innerText = "Release"
  button.addEventListener('click', destroyPokemon)
  li.appendChild(button)
  ul.appendChild(li)
}

function addPokemon(event) {
  event.preventDefault();
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: event.target.dataset.trainerId
    })
  })
  .then(response => response.json())
  .then(pokemon => {
    if (pokemon.message) {
      alert(pokemon.message)
    } else {
      renderPokemon(pokemon)
    }
  });
}

function destroyPokemon(event) {
  event.preventDefault();
  fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  event.target.parentElement.remove();
}