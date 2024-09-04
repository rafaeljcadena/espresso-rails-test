# frozen_string_literal: true

class CardsUpdateService
  attr_reader :card

  def initialize(card, params, current_user)
    email = params[:email]
    user = User.where(email: email, company_id: current_user.company_id).first if email

    card.user = user

    @card = card
    @card.creator = current_user
  end
end
