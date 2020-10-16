const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener("DOMContentLoaded", function(e) {
    getTrainers();
})

function getTrainers() {
    return fetch(TRAINERS_URL).then(response => response.json()).then(result => createCards(result))
}

function createCards(result) {
    for (const trainer of result) {
        appendCard(trainer)
    }
}

function appendCard(trainer) {
    const main = document.querySelector("main")
    
    let card = document.createElement("div")
    card.className = "card"
    card.setAttribute("data-id", `${trainer["id"]}`)
    main.appendChild(card)

    let p = document.createElement("p")
    p.innerText = `${trainer["name"]}`
    card.appendChild(p)

    let add = document.createElement("button")
    add.setAttribute("data-trainer-id", `${trainer["id"]}`)
    add.innerText = "Add Pokemon"
    add.addEventListener("click", function(e) {
        if (e.target.closest("div").querySelector("ul").querySelectorAll("li").length < 6) {
            fetch("http://localhost:3000/pokemons", {
                method: 'POST',
                headers:  {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({trainer_id: `${trainer["id"]}`})
            })
            .then(response => response.json())
            .then(result => appendPokemon(result, ul))
        } 
    })
    card.appendChild(add)

    let ul = document.createElement("ul")
    card.appendChild(ul)

    const pokemons = trainer["pokemons"]
    for (const pokemon of pokemons) {
        appendPokemon(pokemon, ul)
    }
}

function appendPokemon(pokemon, ul) {
    let li = document.createElement("li")
    li.innerText = `${pokemon["nickname"]} (${pokemon["species"]})`
    ul.appendChild(li)

    let release = document.createElement("button")
    release.className = "release"
    release.setAttribute("data-pokemon-id", `${pokemon["id"]}`)
    release.innerText = "Release"
    release.addEventListener("click", function(e) {
        fetch(`http://localhost:3000/pokemons/${e.target.dataset.pokemonId}`, {
            method: 'DELETE',
            headers:  {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: `${e.target.closest("div").querySelector("button").dataset.trainerId}`})
        })
        .then(response => response.json())
        .then(e.target.closest("li").remove())
    })
    li.appendChild(release)
}

function newPokemon(trainer) {
    let result = fetch("http://localhost:3000/pokemons", {
            method: 'POST',
            headers:  {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({trainer_id: `${trainer["id"]}`})
        })
    
}










const configObj = {
    method: 'POST',
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: "1"})
  }