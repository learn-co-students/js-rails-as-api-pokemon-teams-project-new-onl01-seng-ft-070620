class PokemonsController < ApplicationController
    def create
        pokemon = Pokemon.new(trainer_id: pokemon_params[:trainer_id], species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)
        if pokemon.trainer.pokemons.length < 6 && pokemon.save 
            render json: PokemonSerializer.new(pokemon)
        else
            render json: {message: "team full"}
        end
    end
    
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon 
            pokemon.delete
            render json: {message: "success"}
        else
            render json: {message: "That pokemon was not found"}
        end
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
