class PokemonsController < ApplicationController
    def new
        # is new or edit needed with javascript frontend?
    end
    
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["pokemon"]["trainer_id"])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end
end
