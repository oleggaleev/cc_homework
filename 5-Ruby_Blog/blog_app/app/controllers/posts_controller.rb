class PostsController < ApplicationController

  def show
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

    if @post.save
      redirect_to posts_path(@post)
    else
      render :new
    end
  end

  def show
    @post = Post.find params[:id]
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


end
