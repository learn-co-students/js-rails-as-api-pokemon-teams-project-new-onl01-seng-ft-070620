class PokemonsController < ApplicationController
# adding a random pokemon to trainer's team
  def create
    trainer = Trainer.find_by(id: params[:trainer_id])

    if trainer && trainer.pokemons.count < 6
      pokemon = Pokemon.create(nickname: "#{Faker::Name.first_name}", species: "#{Faker::Games::Pokemon.name}")
      trainer.pokemons << pokemon
      render json: pokemon, except: [:created_at, :updated_at]
    else
      render json: { message: "unable to add new pokemon" }
    end
  end

# removing a pokemon from trainer's team
  def destroy
    pokemon = Pokemon.find_by(id: params[:id])

    if pokemon
      render json: pokemon, except: [:created_at, :updated_at]
      pokemon.destroy
    else
      render json: { message: "unable to release pokemon" }
    end
  end

end
