# frozen_string_literal: true

class AddIndexToCategoryName < ActiveRecord::Migration[5.2]
  def change
    add_index :categories, %i[name company_id], unique: true
  end
end
