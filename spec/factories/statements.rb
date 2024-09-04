FactoryBot.define do
  factory :statement do
    performed_at { Time.zone.now }
    cost { 1000 }
    card_last4 { '1111' }
    merchant { 'Despesa' }
    transaction_id { SecureRandom.hex(10) }

    factory :statement_a do
      before(:create) do |statement|
        if statement.card.present?
          statement.card_last4 = statement.card.last4
          next
        end

        card = create(:card_a)
        statement.card = card
        statement.card_last4 = card.last4
      end
    end
  end
end
