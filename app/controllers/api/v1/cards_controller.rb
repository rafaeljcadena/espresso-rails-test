# frozen_string_literal: true

module Api
  module V1
    class CardsController < BaseController
      before_action :set_card, only: %i[update destroy]
      before_action :authorize_admin

      def index
        @cards = CardsListService.new(current_user).cards
      end

      def create
        card = CardsCreateService.new(card_create_params, current_user).card

        if card.save
          render json: card, status: :created
        else
          render json: card.errors, status: :unprocessable_entity
        end
      end

      def update
        card = CardsUpdateService.new(@card, card_update_params, current_user).card

        if card.save
          render json: card, status: :ok
        else
          render json: card.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @card.destroy

        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_card
        @card = CardsFindService.new(params[:id], current_user).card
      end

      # Only allow a list of trusted parameters through.
      def card_create_params
        params.require(:card).permit(:last4, :email)
      end

      def card_update_params
        params.require(:card).permit(:email)
      end
    end
  end
end
