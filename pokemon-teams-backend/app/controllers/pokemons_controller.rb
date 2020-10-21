class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, only: [:id, :species]
  end

  def create
    pokemon = Pokemon.create(
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name,
      trainer: Trainer.find(params[:trainer_id])
    )
    render json: pokemon
  end

  def delete
    pokemon = Pokemon.find(params[:pokemon_id])
    pokemon.destroy
  end
end
