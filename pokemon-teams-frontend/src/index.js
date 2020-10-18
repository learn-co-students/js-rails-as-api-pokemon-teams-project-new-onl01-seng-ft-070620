const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", event => {
    fetch(TRAINERS_URL)
        .then(response => {
            return response.json()
        })
        .then(json => {
            json.forEach(trainer => {
                const div = document.createElement("div")
                const p = document.createElement("p")
                const button = document.createElement("button")
                const ul = document.createElement("ul")

                div.className = "card"
                div.setAttribute("data-id", trainer["id"])
                p.innerHTML = trainer["name"]
                button.setAttribute("data-trainer-id", trainer.id)
                button.innerHTML = "Add Pokemon"
                button.addEventListener("click", event => {
                    // ADD A NEW POKEMON
                    event.preventDefault()
                    const configObj = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({trainer_id: `${trainer.id}`})
                    }

                    fetch(POKEMONS_URL, configObj)
                        .then(resp => json)
                        .then(json => {
                            if (json.message) {
                                alert(json.message)
                            }
                        })
                })

                div.appendChild(p)
                div.appendChild(button)
                div.appendChild(ul)

                main.appendChild(div)

                trainer.pokemons.forEach(pokemon => {
                    
                    const li = document.createElement("li")
                    const button = document.createElement("button")

                    li.innerHTML = `${pokemon.species} (${pokemon.nickname})`
                    button.innerHTML = "Release"
                    button.className = "release"
                    button.addEventListener("click", event => {
                        // RELEASE A POKEMON
                        event.preventDefault()
                        const configObj = {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            }
                        }
                        // debugger
                        fetch(`${POKEMONS_URL}/${trainer.id}`, configObj)
                        event.target.parentElement.remove()
                    })

                    li.appendChild(button)
                    ul.appendChild(li)
                })
            })
        })
})