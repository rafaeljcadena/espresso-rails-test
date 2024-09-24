# frozen_string_literal: true

FactoryBot.define do
  factory :statement do
    performed_at { Time.zone.now }
    cost { 1000 }
    card_last4 { '1111' }
    merchant { 'Despesa' }
    transaction_id { SecureRandom.hex(10) }
  end
end
