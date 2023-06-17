class AddPeriodYearAndPeriodTermToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :period_year, :string
    add_column :reviews, :period_term, :string
  end
end
