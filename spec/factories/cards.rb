# frozen_string_literal: true

FactoryBot.define do
  factory :card do
    last4 { '1111' }

    factory :card_a do
      user factory: :employee_a_first
    end

    factory :card_b do
      user factory: :employee_b
    end
  end
end
