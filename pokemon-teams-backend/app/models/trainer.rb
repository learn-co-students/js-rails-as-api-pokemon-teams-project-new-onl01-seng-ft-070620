class Trainer < ApplicationRecord
    has_many :pokemons

    validate do
        pokemon_count_valid?
    end

    private

    def pokemon_count_valid?
        if self.trainer.pokemons.count >= 6
            self.errors.add(:team_max, "Maximum number of Pokemons reached.")
        end
    end
end
