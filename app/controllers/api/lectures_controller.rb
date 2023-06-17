class Api::LecturesController < ApplicationController
  before_action :set_lecture, only: [:show]

  # GET /lectures
  def index
    @lectures = Lecture.page(params[:page]).per(params[:limit])
    render json: @lectures
  end
  
  # GET /lectures/1
  def show
    render json: @lecture
  end

  # POST /lectures
  def create
    @lecture = Lecture.new(lecture_params)

    if @lecture.save
      render json: @lecture, status: :created
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def lecture_params
      params.require(:lecture).permit(:title, :lecturer, :faculty)
    end
end
