class Api::LecturesController < ApplicationController
  before_action :set_lecture, only: [:show]

# GET /lectures
def index
  @lectures = Lecture.page(params[:page]).per(params[:limit])

  @lectures = @lectures.as_json 
  @lectures.each do |lecture|
    lecture_obj = Lecture.find(lecture["id"]) 
    avg_rating = lecture_obj.reviews.average(:rating) || 0 
    lecture[:avg_rating] = avg_rating.round(2) 
  end

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
    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    def lecture_params
      params.require(:lecture).permit(:title, :lecturer, :faculty)
    end
end
