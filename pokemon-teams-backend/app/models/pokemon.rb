class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :pokemon_count

  def pokemon_count
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team, "is already full")
    end
  end
end
