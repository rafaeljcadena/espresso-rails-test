# frozen_string_literal: true

class Statement < ApplicationRecord
  belongs_to :card, optional: true
  belongs_to :category, optional: true

  has_one_attached :file

  scope :admin_query, ->(company_id) { Statement.joins(card: :user).where(users: { company_id: company_id }) }
  scope :employee_query, ->(user_id) { Statement.joins(card: :user).where(users: { id: user_id }) }

  DEFAULT_STATUS = %w[non_verified verified].freeze
  enum status: DEFAULT_STATUS

  validates :category, presence: true, if: proc { category_id }

  validates :performed_at, :cost, :merchant, :transaction_id, :card_last4, presence: true
  validates :cost, numericality: { only_integer: true, allow_blank: true }
  validates :status, inclusion: { in: statuses }

  validate :correct_file_mime_type
  validate :check_category_company, if: proc { card.present? && category.present? }
  
  private

  def correct_file_mime_type
    if file.attached? && !file.content_type.in?(%w(image/png image/jpeg application/pdf))
      errors.add(:file, 'Formato de arquivo inválido')
    end
  end

  def check_category_company
    card_company = card.user.company_id
    category_company = category.company_id

    is_valid = card_company == category_company
    errors.add(:check_category_company, 'categoria não encontrada para esta empresa') unless is_valid
  end
end
