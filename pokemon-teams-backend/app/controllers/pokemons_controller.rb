class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.trainer = Trainer.find_by(id: params[:trainer_id])
        if pokemon.trainer.pokemons.length < 6
            # pokemon.save
            render json: pokemon
        else
            render json: {message: 'You already have a full team!'}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            # pokemon.delete
            render json: {message: 'Successfully released!'}
        else
            render json: {message: 'Successfully released!'}
        end
        
    end
end
