Rails.application.routes.draw do
  post '/pokemons', to: 'pokemons#create'
  delete '/pokemons/:id', to: 'pokemons#destroy'
  get '/trainers', to: 'trainers#index'
end