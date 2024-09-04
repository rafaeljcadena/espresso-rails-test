FactoryBot.define do
  factory :category do
    factory :category_a do
      name { 'Categoria - Empresa A' }
      company factory: :company_a
    end

    factory :category_b do
      name { 'Categoria - Empresa B' }
      company factory: :company_b
    end
  end
end
