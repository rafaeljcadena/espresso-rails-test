# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UsersController do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/users').to route_to('api/v1/users#index', format: :json)
    end

    it 'routes to #create_employee' do
      expect(post: '/api/v1/users/create_employee.json').to route_to('api/v1/users#create_employee', format: 'json')
    end

    it 'routes to #create_admin' do
      expect(post: '/api/v1/users/create_admin.json').to route_to('api/v1/users#create_admin', format: 'json')
    end

    it 'routes to #update_employee via PATCH' do
      expect(patch: '/api/v1/users/1/update_employee').to route_to('api/v1/users#update_employee', id: '1', format: :json)
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1/users/1/destroy_employee').to route_to('api/v1/users#destroy_employee', id: '1', format: :json)
    end
  end
end
