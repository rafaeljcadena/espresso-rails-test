require 'rails_helper'

RSpec.describe Company do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:cnpj) }
  end

  describe 'custom validation' do
    it 'validate cnpj format' do
      invalid_cnpj = '0000000000'

      company = build(:company_a, cnpj: invalid_cnpj)

      company.valid?
      expect(company.errors).to have_key(:cnpj)
    end
  end
end
