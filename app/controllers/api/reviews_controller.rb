class Api::ReviewsController < ApplicationController
  before_action :set_lecture

  # POST /lectures/:lecture_id/reviews
  def create
    @review = @lecture.reviews.new(review_params)

    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lectures/:lecture_id/reviews/:id
  def destroy
    @review = @lecture.reviews.find(params[:id])
    if @review.destroy
      head :no_content
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  private

  def set_lecture
    @lecture = Lecture.find(params[:lecture_id])
  end

  def review_params
    params.require(:review).permit(:rating, :content)
  end
end