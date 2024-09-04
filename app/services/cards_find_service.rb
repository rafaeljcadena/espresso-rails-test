# frozen_string_literal: true

class CardsFindService
  attr_reader :card

  def initialize(id, current_user)
    @card = Card.joins(:user)
                .where(users: { company_id: current_user.company_id })
                .where(id: id)
                .first
    raise ActiveRecord::RecordNotFound if @card.blank?

    @card.creator = current_user
  end
end
