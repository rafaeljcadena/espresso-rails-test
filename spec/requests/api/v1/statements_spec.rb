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

RSpec.describe '/statements' do
  let(:valid_attributes) { attributes_for(:statement_a) }
  let(:company_a) { create(:company_a) }
  let(:category_a) { create(:category_a, company: company_a) }
  let(:admin_a) { create(:admin_a, company: company_a) }
  let(:employee_a_first) { create(:employee_a_first, company: company_a) }
  let(:employee_a_second) { create(:employee_a_second, company: company_a) }
  let(:card_a) { create(:card_a, user: employee_a_first) }
  let(:statement_a) { create(:statement_a, card: card_a) }
  let(:admin_auth_token) { admin_a.create_new_auth_token }
  let(:employee_auth_token) { employee_a_first.create_new_auth_token }

  describe 'GET /index' do
    it 'not allowed for employees' do
      get api_v1_statements_path
      expect(response).to have_http_status(:unauthorized), headers: employee_auth_token
    end

    it 'renders a unauthorized response for non-authenticated user' do
      create(:card_a, user: admin_a)

      get api_v1_statements_path
      expect(response).to have_http_status(:unauthorized)
    end

    it 'renders a successful response for authenticated user' do
      create(:card_a, user: admin_a)

      get api_v1_statements_path, headers: admin_auth_token
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /archive' do
    it 'not allowed for employees' do
      patch archive_api_v1_statement_path(statement_a),
            headers: employee_auth_token
      expect(response).to have_http_status(:unauthorized)
    end

    it 'does archive statements' do
      patch archive_api_v1_statement_path(statement_a),
            headers: admin_auth_token

      statement_a.reload
      expect(statement_a.archived).to be_truthy
    end
  end

  describe 'PATCH /update' do
    it 'not allow admins access' do
      patch api_v1_statement_path(statement_a),
            params: { statement: {} },
            headers: admin_auth_token
      expect(response).to have_http_status(:unauthorized)
    end

    context 'with valid parameters' do
      it 'update statement by employees' do
        file = fixture_file_upload('spec/fixtures/files/image.png')
        patch api_v1_statement_path(statement_a),
              params: { statement: { category_id: category_a.id, file: file } },
              headers: employee_auth_token
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      it 'does not update statements by employees' do
        invalid_file = fixture_file_upload('spec/fixtures/files/invalid-file.xls')
        patch api_v1_statement_path(statement_a), params: { statement: { file: invalid_file, category_id: nil } },
                                                  headers: employee_auth_token

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
