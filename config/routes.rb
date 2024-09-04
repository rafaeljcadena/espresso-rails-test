# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: :json }, path: '/api' do
    namespace :v1 do
      post :webhooks, to: 'baas#webhooks'

      resources :statements, only: %i[index update] do
        member do
          patch :archive
        end
      end
      resources :users, only: %i[index create update] do
        collection do
          post :create_employee
          post :create_admin
        end
        member do
          patch :update_employee
          delete :destroy_employee
        end
      end
      resources :companies
      resources :categories, only: %i[index create update destroy]
      resources :cards, only: %i[index create update destroy]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  # Front routes
  get 'app', to: 'home#index'
  get 'app/*other', to: 'home#index'
  # get 'app/cards', to: 'home#index'
  # get 'app/categories', to: 'home#index'
  # get 'app/users', to: 'home#index'
  # get 'app/sign-in', to: 'home#index'
  # get 'app/sign-up', to: 'home#index'
end
