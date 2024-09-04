# frozen_string_literal: true

class UsersUpdateService
  attr_reader :user

  def initialize(id, current_user)
    @user = User.where(id: id, company: current_user.company, role: :employee).first

    raise ActiveRecord::RecordNotFound if @user.blank?
  end
end
