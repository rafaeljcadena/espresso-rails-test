# frozen_string_literal: true

class StatementsCreateService
  attr_reader :statement

  def initialize(params)
    @statement = Statement.new(params)

    @statement.card = Card.find_by(last4: @statement.card_last4)
  end
end
