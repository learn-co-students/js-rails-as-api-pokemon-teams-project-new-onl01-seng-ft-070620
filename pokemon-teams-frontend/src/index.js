const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers() {
    return fetch('http://localhost:3000/trainers')
      .then(res => res.json())
  }

  function renderTrainers(trainer) {
    let h2 = document.createElement('h2')
    h2.innerText = trainer.name
  
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    divCollect.append(divCard)
  }