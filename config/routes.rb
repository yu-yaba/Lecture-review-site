Rails.application.routes.draw do
  root to: 'site#index'
  
  namespace :api do
    resources :lectures do
      resources :reviews, only: [:index, :create]
      member do
        post 'images', to: 'lectures#create_image'
        get 'images', to: 'lectures#show_image' # 追加
      end
    end
  end

  get '*path', to: 'site#index', constraints: ->(request){ request.format.html? }
end
