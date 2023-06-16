Rails.application.routes.draw do  
  namespace :api do
    resources :lectures do
      resources :reviews, only: [:index, :create]
    end
  end
  
  # これを追加します。これにより、未知のルートがリクエストされたときには全てsiteコントローラーのindexアクションにルーティングします。
  get '*path', to: 'site#index', constraints: ->(request){ request.format.html? }
  root to: 'site#index'end
