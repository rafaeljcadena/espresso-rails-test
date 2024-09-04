class Company < ApplicationRecord
  validates :cnpj, :name, presence: true
  validates :cnpj, :name, uniqueness: true

  validate :check_cnpj, if: proc { cnpj.present? }
  def check_cnpj
    errors.add(:cnpj, 'CNPJ inválido') unless CNPJ.valid?(cnpj, strict: true)
  end
end
