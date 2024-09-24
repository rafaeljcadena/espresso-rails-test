# frozen_string_literal: true

require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe '/categories' do
  let(:valid_attributes) { attributes_for(:category_a) }
  let(:company_a) { create(:company_a) }
  let(:category_a) { create(:category_a, company: company_a) }
  let(:admin_a) { create(:admin_a, company: company_a) }
  let(:employee_a_first) { create(:employee_a_first, company: company_a) }

  def admin_auth_token
    admin_a.create_new_auth_token
  end

  def employee_auth_token
    employee_a_first.create_new_auth_token
  end

  describe 'GET /index' do
    it 'not allowed for employees' do
      get api_v1_categories_path
      expect(response).to have_http_status(:unauthorized), headers: employee_auth_token
    end

    it 'renders a unauthorized response for non-authenticated user' do
      create(:card_a, user: admin_a)

      get api_v1_categories_path
      expect(response).to have_http_status(:unauthorized)
    end

    it 'renders a successful response for authenticated user' do
      create(:card_a, user: admin_a)

      get api_v1_categories_path, headers: admin_auth_token
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    it 'not allowed for employees' do
      employee_a_first.email

      post api_v1_categories_path, params: { category: valid_attributes }, headers: employee_auth_token
      expect(response).to have_http_status(:unauthorized)
    end

    context 'with valid parameters' do
      it 'creates a new Category' do
        expect do
          employee_with_company_a = create(:employee_a_first, company: admin_a.company)
          employee_with_company_a.email

          post api_v1_categories_path, params: { category: valid_attributes }, headers: admin_auth_token
        end.to change(Category, :count)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Category' do
        expect do
          create(:employee_a_first, company: admin_a.company)

          post api_v1_categories_path, params: { category: { name: nil } }, headers: admin_auth_token
        end.not_to change(Category, :count)
      end
    end
  end

  describe 'PATCH /update' do
    it 'not allowed for employees' do
      patch api_v1_category_path(category_a),
            params: { category: { name: 'Categoria - Empresa A - EDITED' } },
            headers: employee_auth_token
      expect(response).to have_http_status(:unauthorized)
    end

    context 'with valid parameters' do
      it 'updates the requested category' do
        new_name = 'Categoria - Empresa A - EDITED'
        patch api_v1_category_path(category_a), params: { category: { name: new_name } }, headers: admin_auth_token
        category_a.reload

        expect(category_a.name).to eq(new_name)
      end
    end

    context 'with invalid parameters' do
      it 'returns unprocessable entity status' do
        patch api_v1_category_path(category_a), params: { category: { name: nil } }, headers: admin_auth_token
        category_a.reload

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'not allowed for employees' do
      delete api_v1_category_url(category_a), headers: employee_auth_token
      expect(response).to have_http_status(:unauthorized)
    end

    it 'destroys the requested category' do
      category_a
      expect do
        delete api_v1_category_url(category_a), headers: admin_auth_token
      end.to change(Category, :count)
    end
  end
end
