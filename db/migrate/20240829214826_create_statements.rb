# frozen_string_literal: true

class CreateStatements < ActiveRecord::Migration[5.2]
  # rubocop:disable Metrics/MethodLength
  def change
    create_table :statements do |t|
      t.datetime :performed_at
      t.bigint :cost
      t.bigint :status, default: 0
      t.string :merchant
      t.string :transaction_id
      t.string :card_last4
      t.references :category
      t.references :card

      t.timestamps
    end
  end
  # rubocop:enable Metrics/MethodLength
end
