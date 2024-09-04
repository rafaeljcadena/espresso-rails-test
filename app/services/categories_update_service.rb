# frozen_string_literal: true

class CategoriesUpdateService
  attr_reader :category

  def initialize(id, current_user)
    @category = Category.where(id: id, company_id: current_user.company_id)
                        .first

    raise ActiveRecord::RecordNotFound if @category.blank?
  end
end
