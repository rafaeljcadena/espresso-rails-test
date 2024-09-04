# frozen_string_literal: true

module Api
  module V1
    class BaseController < ApplicationController
      respond_to :json
      protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
      before_action :authenticate_user!

      def authorize_admin
        return nil if current_user.blank?

        render json: {}, status: :unauthorized unless current_user.admin?
      end

      def authorize_employee
        return nil if current_user.blank?

        render json: {}, status: :unauthorized unless current_user.employee?
      end
    end
  end
end
