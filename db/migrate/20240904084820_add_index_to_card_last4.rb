# frozen_string_literal: true

class AddIndexToCardLast4 < ActiveRecord::Migration[5.2]
  def change
    add_index :cards, :last4, unique: true
  end
end
