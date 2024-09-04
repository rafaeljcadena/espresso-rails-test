require 'rails_helper'

RSpec.describe User do
  describe 'associations' do
    it { is_expected.to belong_to(:company) }
    it { is_expected.to accept_nested_attributes_for(:company) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:role) }
    it { is_expected.to define_enum_for(:role) }
  end
end
