class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email params[:email]
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logged in"
    else
      flash[:alert] = "Wrong email or password"
      render :new
    end
  end

  def edit
    user = User.find params[:id]
  end

  def update

    user = User.find params[:id]

    if user.update session_params
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: 'Signed Out!'
  end

  private
  def session_params
    params.require(:session).permit(:email, :password)
  end


end
