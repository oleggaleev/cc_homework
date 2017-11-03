Rails.application.routes.draw do
  get 'password_resets/new'

  get 'password_resets/edit'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :posts

  resource :session, only: [:new, :create, :edit, :update] do
    delete :destroy, on: :collection
  end

  resources :users, only: [:new, :create, :edit, :update] do
      get   :edit_password, on: :member
      patch :update_password, on: :member
  end

  resources :posts do
    resources :comments, only: [:create, :destroy, :edit]
  end

  resources :password_resets, only: [:new, :create, :edit, :update]


  # post('posts', to: 'posts#create', as: :posts)
  # get('posts', to: 'posts#index')
  # get('posts/new', to: 'posts#new', as: :new_post)
  # get('posts/:id', to: 'posts#show', as: :post)
  # patch('posts/:id', to: 'posts#update')
  # delete('posts/:id', to: 'posts#destroy')
  # get('posts/:id/edit', to: 'posts#edit', as: :edit_post)
  #
  #
  get('/about', to: 'posts#about', as: :about)
  get('/contact', to: 'posts#contact', as: :contact)
  root 'posts#index'
end
