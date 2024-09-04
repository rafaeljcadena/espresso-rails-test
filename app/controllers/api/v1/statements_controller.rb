# frozen_string_literal: true

module Api
  module V1
    class StatementsController < BaseController
      before_action :set_updateable_statement, only: %i[archive update]
      before_action :authorize_admin, except: :update
      before_action :authorize_employee, only: :update

      def index
        @statements = StatementsListService.new(current_user, params[:filter].presence, params[:page]).statements
      end

      def archive
        @statement.toggle!(:archived)

        render json: @statement, status: :ok
      end

      def update
        statement_service = StatementsUpdateService.new(@statement, statement_update_params)

        if statement_service.update
          render json: statement_service.statement, status: :ok
        else
          render json: statement_service.errors, status: :unprocessable_entity
        end
      end

      private

      def set_updateable_statement
        @statement = StatementsFindService.new(params[:id], current_user).statement
      end

      def statement_update_params
        params.require(:statement).permit(:file, :category_id)
      end
    end
  end
end
