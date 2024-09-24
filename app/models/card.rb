# frozen_string_literal: true

class Card < ApplicationRecord
  belongs_to :user

  attr_accessor :creator, :email

  validates :last4, uniqueness: true
  validates :last4, length: { is: 4, allow_blank: true }

  validate :check_creator_company, if: proc { user.present? && creator.present? }
  def check_creator_company
    is_valid = creator.company_id == user.company_id
    errors.add(:check_user_company, 'funcionário não pertence a empresa do administrador') unless is_valid
  end
end
