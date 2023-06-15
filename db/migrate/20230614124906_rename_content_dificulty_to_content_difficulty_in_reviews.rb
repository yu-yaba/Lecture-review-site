class RenameContentDificultyToContentDifficultyInReviews < ActiveRecord::Migration[7.0]
  def change
    rename_column :reviews, :content_dificulty, :content_difficulty
  end
end
