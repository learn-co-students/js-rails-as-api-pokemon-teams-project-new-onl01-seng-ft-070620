const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(r => r.json())
// .then(j => console.log(j.data))
.then(trainers => {
    let main = document.querySelector('main')
    for(let trainer of trainers.data)
    {
        let trainerCard = document.createElement('div')
        let name = document.createElement('p')
        let addPokemonButton = document.createElement('button')
        let teamList = document.createElement('ul')
        let theTeam = trainer.relationships.pokemons.data
        
        name.innerText = trainer.attributes.name
        addPokemonButton.innerText = "Add Pokemon"
        addPokemonButton['data-trainer-id'] = trainer.id
        addPokemonButton.addEventListener('click', function()
        {
            addPokemon(this, teamList)
        })
        trainerCard.className = 'card'
        for(let pokemon of theTeam)
        {
            fetch(`${POKEMONS_URL}/${pokemon.id}`)
            .then(r => r.json())
            .then(realPokemon => renderTeam(realPokemon, teamList))
        
        }

        trainerCard.appendChild(name)
        trainerCard.appendChild(addPokemonButton)
        trainerCard.appendChild(teamList)
        main.appendChild(trainerCard)
    }
})

function renderTeam(realPokemon, teamList)
{
    let pokemonListing = document.createElement('li')
    let releaseButton = document.createElement('button')

    releaseButton.innerText = 'Release'
    releaseButton.className = 'release'
    releaseButton['data-pokemon-id'] = realPokemon.data.id
    releaseButton.addEventListener('click', releasePokemon)
    pokemonListing.innerText = `${realPokemon.data.attributes.nickname} (${realPokemon.data.attributes.species})`
    pokemonListing.appendChild(releaseButton)
    teamList.appendChild(pokemonListing)
}

function addPokemon(button, teamList)
{
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: button['data-trainer-id']})
    }
    fetch(`${POKEMONS_URL}`, options)
    .then(r => r.json())
    .then(newPokemon => addNode(newPokemon, teamList))
    function addNode(pokemon, teamList)
    {
        
        let pokemonListing = document.createElement('li')
        let releaseButton = document.createElement('button')

        releaseButton.innerText = 'Release'
        releaseButton.className = 'release'
        releaseButton['data-pokemon-id'] = pokemon.id
        releaseButton.addEventListener('click', releasePokemon)
        
        pokemonListing.innerText = `${pokemon.nickname} (${pokemon.species})`
        pokemonListing.appendChild(releaseButton)
        teamList.appendChild(pokemonListing)
    }
}

function releasePokemon()
{
    let options = {
        method: 'DELETE'
    }
    fetch(`${POKEMONS_URL}/${this['data-pokemon-id']}`, options)
    .then(r => r.json())
    .then(j => removeNode(j.message, this))
    function removeNode(message, button)
    {
        if (message == 'Successfully released!')
        {
            button.parentNode.remove()
        }
        else
        {
            alert(message)
        }
    }
}
