module Api
  module V1
    class CategoriesController < BaseController
      before_action :set_updateable_category, only: %i[update destroy]
      before_action :authorize_admin

      def index
        categories = CategoriesListService.new(current_user).categories

        render json: categories, status: :ok
      end

      def create
        category = CategoriesCreateService.new(category_params, current_user).category

        if category.save
          render json: category, status: :created
        else
          render json: category.errors, status: :unprocessable_entity
        end
      end

      def update
        if @category.update(category_params)
          render json: @category, status: :ok
        else
          render json: @category.errors, status: :unprocessable_entity
        end
      end

      # DELETE /categories/1 or /categories/1.json
      def destroy
        @category.destroy

        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_updateable_category
        @category = CategoriesUpdateService.new(params[:id], current_user).category
      end

      # Only allow a list of trusted parameters through.
      def category_params
        params.require(:category).permit(:name)
      end
    end
  end
end
