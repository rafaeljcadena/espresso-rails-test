# frozen_string_literal: true

class UsersListService
  attr_reader :users

  def initialize(current_user)
    @users = User.where(company_id: current_user.company_id, role: :employee)
  end
end
