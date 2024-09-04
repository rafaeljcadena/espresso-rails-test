require 'rails_helper'

RSpec.describe Card do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:last4) }
    it { is_expected.to validate_length_of(:last4).is_equal_to(4).allow_blank }

    it "check_creator_company: check if creator belongs same company of employee's card" do
      card_a = build(:card_a)

      admin_b = create(:admin_b)

      card_a.creator = admin_b

      card_a.valid?
      expect(card_a.errors).to have_key(:check_user_company)
    end
  end

  describe 'virtual attributes' do 
    it 'respond to creator attribute' do
      expect(described_class.new).to respond_to(:creator)
    end
    it 'respond to email attribute' do
      expect(described_class.new).to respond_to(:email)
    end
  end
end
