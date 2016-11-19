class TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.tasks.all.order(:id)
  end

  def create
    task = current_user.tasks.create(task_params)
    render json: task
  end

  def update
    task = current_user.tasks.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:title, :done)
  end
end
