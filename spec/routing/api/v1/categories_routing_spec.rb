# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CategoriesController do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/categories').to route_to('api/v1/categories#index', format: :json)
    end

    it 'routes to #create' do
      expect(post: '/api/v1/categories').to route_to('api/v1/categories#create', format: :json)
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1/categories/1').to route_to('api/v1/categories#update', id: '1', format: :json)
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1/categories/1').to route_to('api/v1/categories#destroy', id: '1', format: :json)
    end
  end
end

