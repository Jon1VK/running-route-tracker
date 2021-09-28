Rails.application.routes.draw do
  root 'static_pages#index'
  get '/dashboard', to: 'static_pages#dashboard', as: :user_root

  devise_for :users, path: '', skip: :registrations, path_names: {
    sign_in: 'login',
    sign_out: 'logout',
  }

  as :user do
    get 'register', to: 'devise/registrations#new', as: :new_user_registration
    post 'register', to: 'devise/registrations#create', as: :user_registration
  end

  namespace :api, defaults: { format: :json } do
    resources :runs, only: [:index, :show, :create, :destroy]
  end
end