class Pokemon < ApplicationRecord
  belongs_to :trainer

  # validate do
  #   pokmeon_count_valid?
  # end

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "Only 6 Pokemon are allowed.")
    end
  end
end
