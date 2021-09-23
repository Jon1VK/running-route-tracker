class Api::RunsController < ApplicationController
  before_action :authenticate_user!

  # GET /runs
  # GET /runs.json
  def index
    @runs = current_user.runs
  end

  # POST /runs
  # POST /runs.json
  def create
    @run = Run.new(run_params)

    if @run.save
      render :show, status: :created
    else
      render json: @run.errors, status: :unprocessable_entity
    end
  end

  # DELETE /runs/1
  # DELETE /runs/1.json
  def destroy
    @run = Run.find(params[:id])
    @run.destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def run_params
      params.require(:run).permit(:user_id, :distance, :duration, :static_map_url)
    end
end
