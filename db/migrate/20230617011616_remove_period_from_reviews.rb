class RemovePeriodFromReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :period, :string
  end
end
