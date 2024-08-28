class Company < ApplicationRecord
  validates :name, presence: true
  validates :cnpj, presence: true

  validate :check_cnpj

  def check_cnpj
    errors.add(:cnpj, 'CNPJ inválido') unless CNPJ.valid?(cnpj, strict: true)
  end
end
