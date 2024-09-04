class AddIndexToCategoryName < ActiveRecord::Migration[5.2]
  def change
    add_index :categories, [:name, :company_id], unique: true
  end
end
