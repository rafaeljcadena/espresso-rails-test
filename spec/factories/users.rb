FactoryBot.define do
  factory :user do
    password { 'lklklklk' }
    password_confirmation { password }

    factory :admin_a do
      name { 'Admin A' }
      email { 'admin_a@teste.com' }
      role { 'admin' }
      company factory: :company_a
    end

    factory :employee_a_first do
      name { 'Funcionario 1 Empresa A' }
      email { 'employee_a_first@teste.com' }
      role { 'employee' }

      before(:create) do |employee|
        next if employee.company.present?

        admin = create(:admin_a)
        employee.company = admin.company
      end
    end

    factory :employee_a_second do
      name { 'Funcionario 2 Empresa A' }
      email { 'employee_a_2@teste.com' }
      role { 'employee' }

      before(:create) do |employee|
        next if employee.company.present?

        admin = create(:admin_a)
        employee.company = admin.company
      end
    end

    factory :admin_b do
      name { 'Admin B' }
      email { 'admin_b@teste.com' }
      role { 'admin' }
      company factory: :company_b
    end

    factory :employee_b do
      name { 'Funcionario 1 Empresa B' }
      email { 'employee_b@teste.com' }
      role { 'employee' }

      before(:create) do |employee|
        next if employee.company.present?

        admin = create(:admin_b)
        employee.company = admin.company
      end
    end
  end
end