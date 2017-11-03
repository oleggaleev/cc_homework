class PostsController < ApplicationController

  before_action :authenticate_user!, except: [:index, :show, :contact, :about]
  before_action :find_post, only: [:show, :edit, :update, :destroy]
  before_action :authorize_user!, except: [:index, :show, :contact, :about, :new, :create]

  def show
    @comment = Comment.new
  end

  def about
  end

  def contact
  end

  def new
    @post = Post.new
  end


  def create

    @post = Post.new post_params
    @post.user = current_user

    if @post.save
      redirect_to posts_path(@post)
    else
      render :new
    end
  end

  def show
    @post = Post.find params[:id]
    @comment = Comment.new
  end


  def edit
    @post = Post.find params[:id]
  end

  def index
    @posts = Post.order(created_at: :desc)
    @featured = Post.last
    @posters = Post.order(created_at: :desc).limit(8)
  end


  def update
    return head :unauthorized unless can?(:update, @post)

    @post = Post.find params[:id]

    if @post.update post_params
      redirect_to @post
    else
      render :edit
    end
  end


  def destroy
    @post = Post.find params[:id]
    @post.destroy
    redirect_to posts_path
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end

  def find_post
    @post = Post.find params[:id]
  end

  def authorize_user!
    unless can?(:manage, @post)
      flash[:alert] = "Access Denied!"
      redirect_to root_path
    end
  end


end
