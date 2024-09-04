# frozen_string_literal: true

class CardsCreateService
  attr_reader :card

  def initialize(params, current_user)
    email = params[:email]
    user = User.where(email: email, company_id: current_user.company_id).first if email

    @card = Card.new(params)
    @card.user = user

    @card.creator = current_user
  end
end
