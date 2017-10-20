Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post('posts', to: 'posts#create', as: :posts)
  get('posts', to: 'posts#index')
  get('posts/new', to: 'posts#new', as: :new_post)
  get('posts/:id', to: 'posts#show', as: :post)
  # resources :posts
# get('questions/:id', to: 'questions#show', as: :question)
  patch('posts/:id', to: 'posts#update')
  delete('posts/:id', to: 'posts#destroy')
  get('posts/:id/edit', to: 'posts#edit', as: :edit_post)


  get('/about', to: 'posts#about', as: :about)
  get('/contact', to: 'posts#contact', as: :contact)
  root 'posts#index'
end
