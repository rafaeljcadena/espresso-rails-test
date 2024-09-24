# frozen_string_literal: true

class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name
      t.index :name, unique: true

      t.string :cnpj
      t.index :cnpj, unique: true

      t.timestamps
    end
  end
end
