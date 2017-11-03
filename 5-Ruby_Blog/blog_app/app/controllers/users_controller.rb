class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path, notice: 'You are logged in'
    else
      render :new
    end
  end


  def edit
    @user = User.find params[:id]
  end

  def edit_password
        @user = User.find params[:id]
      end

  def update_password
    # update_password_user_path
    user_params = params.require(:user).permit(:password,
                                               :password_confirmation)
    @user = User.find params[:id]

     if @user&.authenticate(params[:user][:current_password])
         if @user.update user_params
           session[:user_id] = @user.id
           redirect_to root_path, notice: 'Password updated successfully!'
         else
           render :edit_password
         end
     else
       flash.now[:alert] = 'Wrong password'
       render :edit_password
     end
  end


  def update

    @user = User.find params[:id]

    if @user.update user_params
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
