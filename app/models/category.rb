# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :company

  validates :name, presence: true
  validates :name, uniqueness: { scope: :company_id, allow_blank: true }
end
