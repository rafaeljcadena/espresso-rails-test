# frozen_string_literal: true

module Api
  module V1
    class BaasController < BaseController
      skip_before_action :authenticate_user!, only: :webhooks

      def webhooks
        statement = StatementsCreateService.new(statement_create_params).statement

        if statement.save
          render json: statement, status: :created
        else
          render json: statement.errors, status: :unprocessable_entity
        end
      end

      private

      def statement_create_params
        params.require(:statement).permit(:performed_at, :cost, :merchant, :transaction_id, :card_last4)
      end
    end
  end
end
