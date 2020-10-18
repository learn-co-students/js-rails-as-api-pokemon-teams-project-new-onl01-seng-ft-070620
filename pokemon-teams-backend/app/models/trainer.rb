class Trainer < ApplicationRecord
    has_many :pokemons

    # validate do 
    #     pokemon_count_valid?
    #   end 
    
    #   private 
    
    #   def pokemon_count_valid?
    #     if self.pokemons.count >= 6
    #       self.errors.add(:team_max, "Too many Pokemons. The maximum number of Pokemons is 6.")
    #     end 
    #   end 
end
