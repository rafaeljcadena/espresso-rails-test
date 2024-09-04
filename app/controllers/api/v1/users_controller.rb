# frozen_string_literal: true

module Api
  module V1
    class UsersController < BaseController
      before_action :set_user, only: %i[update_employee destroy_employee]
      skip_before_action :authenticate_user!, only: :create_admin
      before_action :authorize_admin

      def index
        @users = UsersListService.new(current_user).users
      end

      def create_employee
        user_service = UsersCreateEmployeeService.new(user_employee_params, current_user)

        if user_service.save
          render json: user_service.user, status: :created
        else
          render json: user_service.errors, status: :unprocessable_entity
        end
      end

      def create_admin
        user = UsersCreateAdminService.new(user_admin_params).user

        if user.save
          render json: user, status: :created
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end

      def update_employee
        if @user.update(user_employee_params)
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def destroy_employee
        @user.destroy

        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = UsersFindService.new(params[:id], current_user).user
      end

      # Only allow a list of trusted parameters through.
      def user_employee_params
        params.require(:user).permit(:name, :email)
      end

      def user_admin_params
        params.require(:user).permit(:name, :email, :password, company_attributes: %i[name cnpj])
      end
    end
  end
end
