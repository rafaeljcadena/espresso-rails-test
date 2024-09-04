# frozen_string_literal: true

class CardsListService
  attr_reader :cards

  def initialize(current_user)
    @cards = Card.joins(:user).where(users: { company_id: current_user.company_id })
  end
end
