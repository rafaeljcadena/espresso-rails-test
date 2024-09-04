# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::StatementsController do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/statements').to route_to('api/v1/statements#index', format: :json)
    end

    it 'routes to #archive via PATCH' do
      expect(patch: '/api/v1/statements/1/archive').to route_to('api/v1/statements#archive', id: '1', format: :json)
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1/statements/1').to route_to('api/v1/statements#update', id: '1', format: :json)
    end
  end
end
