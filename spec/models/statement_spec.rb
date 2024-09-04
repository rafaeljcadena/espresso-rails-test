require 'rails_helper'

RSpec.describe Statement do
  describe 'associations' do
    it { is_expected.to belong_to(:card).optional }
    it { is_expected.to belong_to(:category).optional }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:performed_at) }
    it { is_expected.to validate_presence_of(:cost) }
    it { is_expected.to validate_presence_of(:merchant) }
    it { is_expected.to validate_presence_of(:transaction_id) }
    it { is_expected.to validate_presence_of(:card_last4) }

    it { is_expected.to validate_numericality_of(:cost).only_integer }
    it { is_expected.to define_enum_for(:status) }

    it 'allow default statuses' do
      described_class::DEFAULT_STATUS.each do |status|
        expect(described_class.new).to allow_value(status).for(:status)
      end
    end
  end

  describe 'custom validation' do
    it 'check_category_company: check if category company is the same of statement company' do
      statement_a = create(:statement_a)
      category_b = create(:category_b)

      statement_a.category = category_b
      statement_a.valid?

      expect(statement_a.errors).to have_key(:check_category_company)
    end
  end
end
