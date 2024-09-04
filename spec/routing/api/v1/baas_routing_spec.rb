# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::BaasController do
  describe 'routing' do
    it 'routes to #webhooks' do
      expect(post: '/api/v1/webhooks').to route_to('api/v1/baas#webhooks', format: :json)
    end
  end
end
