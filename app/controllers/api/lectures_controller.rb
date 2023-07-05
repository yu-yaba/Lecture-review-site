class Api::LecturesController < ApplicationController
  before_action :set_lecture, only: [:show, :update, :create_image, :show_image]

  # GET /lectures
  def index
    @lectures = Lecture.page(params[:page]).per(params[:limit])

    @lectures = @lectures.as_json
    @lectures.each do |lecture|
      lecture_obj = Lecture.find(lecture["id"])
      avg_rating = lecture_obj.reviews.average(:rating) || 0
      lecture[:avg_rating] = avg_rating.round(2)
      lecture[:image_url] = rails_blob_url(lecture_obj.image) if lecture_obj.image.attached?
    end

    render json: @lectures
  end

  # GET /lectures/1
  def show
    render json: @lecture.as_json.merge({ image_url: rails_blob_url(@lecture.image) }) if @lecture.image.attached?
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

  # POST /lectures/1/images
  def create_image
    @lecture.image.attach(params[:lecture][:image])

    if @lecture.save
      render json: @lecture, status: :created
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  def show_image
    Rails.logger.debug "show_image action called"
    
    if @lecture.image.attached?
      render json: { image_url: rails_blob_url(@lecture.image) }
    else
      render json: { error: 'No image attached' }, status: 404
    end
  end  
  
  # PATCH/PUT /lectures/1
  def update
    if @lecture.update(lecture_params)
      render json: @lecture
    else
      render json: @lecture.errors, status: :unprocessable_entity
    end
  end

  private
    def set_lecture
      @lecture = Lecture.find(params[:id])
    end

    def lecture_params
      params.require(:lecture).permit(:title, :lecturer, :faculty, :image)
    end
end
