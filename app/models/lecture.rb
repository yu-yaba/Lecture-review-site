class Lecture < ApplicationRecord
  has_many :reviews
  has_one_attached :image
end
