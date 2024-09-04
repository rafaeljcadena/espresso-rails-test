require 'rails_helper'

RSpec.describe Category do
  describe 'associations' do
    it { is_expected.to belong_to(:company) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:company_id).allow_blank }
  end
end
