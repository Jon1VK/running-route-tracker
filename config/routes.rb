Rails.application.routes.draw do
  root 'static_pages#index'
  get '/profile', to: 'static_pages#profile', as: :user_root

  devise_for :users, path: '', skip: :registrations, path_names: {
    sign_in: 'login',
    sign_out: 'logout',
  }

  as :user do
    get 'register', to: 'devise/registrations#new', as: :new_user_registration
    post 'register', to: 'devise/registrations#create', as: :user_registration
  end
end