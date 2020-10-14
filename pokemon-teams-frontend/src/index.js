const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

// invoke functions to display all trainers on page load
document.addEventListener("DOMContentLoaded", function() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(jsObj => addTrainers(jsObj))
})

// invoke createCard() for each trainer
function addTrainers(trainers) {
  for (trainer of trainers) {
    createCard(trainer)
  }
}

// create cards for each trainer
function createCard(trainer) {
  card = document.createElement("div")
  card.className = "card"
  card.setAttribute("data-id", `${trainer["id"]}`)

  p = document.createElement("p")
  p.innerText = trainer["name"]

  addBtn = document.createElement("button")
  addBtn.innerText = "Add Pokemon"
  addBtn.setAttribute("data-trainer-id", `${trainer["id"]}`)
  addBtn.addEventListener("click", e => addPokemon(e))

  ul = document.createElement("ul")

  for (pokemon of trainer["pokemons"]) {
    let pokemonId = pokemon["id"]

    li = document.createElement("li")
    li.innerText = `${pokemon["nickname"]} (${pokemon["species"]}) `

    releaseBtn = document.createElement("button")
    releaseBtn.className = "release"
    releaseBtn.innerText = "Release"
    releaseBtn.setAttribute("data-pokemon-id", pokemonId)
    releaseBtn.addEventListener("click", e => releasePokemon(e))

    li.appendChild(releaseBtn)
    ul.appendChild(li)
  }

  card.append(p, addBtn, ul)
  main.appendChild(card)
}

// upon "Add Pokemon" button click, make a POST request to /pokemons via fetch()
function addPokemon(button) {
  const card = button.target.parentElement
  const trainerId = parseInt(card.querySelector("button").getAttribute("data-trainer-id"))

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {"trainer_id": trainerId} )
  }

  fetch(POKEMONS_URL, configObj)
  .then(response => response.json())
  .then(function(pokemon) {
    const li = document.createElement("li")
    li.innerText = `${pokemon["nickname"]} (${pokemon["species"]}) `

    releaseBtn = document.createElement("button")
    releaseBtn.className = "release"
    releaseBtn.innerText = "Release"
    releaseBtn.setAttribute("data-pokemon-id", pokemon["id"])

    li.appendChild(releaseBtn)
    card.querySelector("ul").appendChild(li)
  })
  .catch(error => console.log(error["message"]))
}

// upon "Release" button click, make a DELETE request to /pokemons/:pokemon_id via fetch()
function releasePokemon(button) {
  const li = button.target.parentElement
  const card = li.parentElement.parentElement
  const trainerId = parseInt(card.querySelector("button").getAttribute("data-trainer-id"))
  const pokemonId = button.target.getAttribute("data-pokemon-id")

  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }

  fetch(POKEMONS_URL + `/${pokemonId}`, configObj)
  .then(li.remove())
  .catch(error => console.log(error["message"]))
}
