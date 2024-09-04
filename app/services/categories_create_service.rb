# frozen_string_literal: true

class CategoriesCreateService
  attr_reader :category

  def initialize(params, current_user)
    @category = Category.new(params)

    @category.company = current_user.company
  end
end
