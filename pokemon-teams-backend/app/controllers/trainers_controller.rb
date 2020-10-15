class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all 
        render json: trainers.to_json(:include => {:pokemon => {:only => [:species, :nickname]}}:except => [:updated_at])
    end 

end
