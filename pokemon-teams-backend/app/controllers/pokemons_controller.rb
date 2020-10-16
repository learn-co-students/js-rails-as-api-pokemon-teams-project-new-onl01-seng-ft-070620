class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        trainer = Trainer.find_by(id: pokemon_params[:trainer_id])
        if trainer.pokemons.length < 6
            pokemon = Pokemon.create(
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name,
                trainer_id: pokemon_params[:trainer_id]
            )
        else
            return render json: {message: "this team already has 6 pokemon"}
        end
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end

    private
    
    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
