# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    factory :company_a do
      name { 'Empresa A' }
      cnpj { '38.093.700/0001-40' }
    end

    factory :company_b do
      name { 'Empresa B' }
      cnpj { '31.411.094/0001-15' }
    end
  end
end
