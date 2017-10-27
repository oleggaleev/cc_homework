class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_post, only: [:create]
  before_action :find_comment, only: [:destroy]
  before_action :authorize_user!, except: [:create]


  def create
    @post = Post.find params[:post_id]
    comment_params = params.require(:comment).permit(:body)
    @comment  = Comment.new comment_params
    @comment.user = current_user
    @comment.post = @post

    if @comment.save
     redirect_to post_path(@post), notice: 'Comment created!'
    else
     render '/posts/show'
   end
  end

  def destroy
    @post = Post.find params[:post_id]
    @comment = Comment.find params[:id]
    @comment.destroy
    redirect_to post_path(@post), notice: 'Comment Deleted'
  end


  private
  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end

  def authorize_user!
      unless can?(:manage, @comment)
        flash[:alert] = "Access Denied!"
        redirect_to root_path
      end
  end

end
