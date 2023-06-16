class Api::ReviewsController < ApplicationController
  before_action :set_lecture
  
  def index
    lecture = Lecture.find(params[:lecture_id])
    reviews = lecture.reviews
    render json: reviews
  end


  # POST /lectures/:lecture_id/reviews
  def create
    @review = @lecture.reviews.new(review_params)

    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  private

  def set_lecture
    @lecture = Lecture.find(params[:lecture_id])
  end

  def review_params
    params.require(:review).permit(:rating, :content, :period, :textbook, :attendance, :grading_type, :content_difficulty, :content_quality)
  end
  end
