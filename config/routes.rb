Rails.application.routes.draw do
  root to: 'api/lectures#index'

  namespace :api do
    resources :lectures do
      resources :reviews, only: [:index, :create]
    end
  end

  get '*path', to: 'site#index', constraints: ->(request){ request.format.html? }
end
