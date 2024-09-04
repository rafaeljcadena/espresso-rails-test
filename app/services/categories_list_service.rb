class CategoriesListService
  attr_reader :categories

  def initialize(current_user)
    @categories = Category.where(company_id: current_user.company_id)
  end
end
