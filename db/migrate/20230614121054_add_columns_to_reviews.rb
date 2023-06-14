class AddColumnsToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :period, :string
    add_column :reviews, :textbook, :string
    add_column :reviews, :attendance, :string
    add_column :reviews, :grading_type, :string
    add_column :reviews, :content_dificulty, :string
    add_column :reviews, :content_quality, :string
  end
end
