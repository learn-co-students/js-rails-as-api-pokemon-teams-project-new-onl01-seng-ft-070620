class TrainersController < ApplicationController
    def index
        trainer = Trainer.all 
        render json: TrainerSerializer.new(trainer).to_serialized_json
    end
end
