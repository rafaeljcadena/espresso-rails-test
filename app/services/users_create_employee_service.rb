# frozen_string_literal: true

class UsersCreateEmployeeService
  attr_reader :errors, :user

  def initialize(params, current_user)
    @user = User.new(params)

    @user.company = current_user.company
    @user.role = :employee
    @user.password = ENV.fetch('DEFAULT_USERPASS')

    @errors = nil
  end

  def save
    if @user.save
      UserMailer.welcome(@user.id).deliver_now

      @user.persisted?
    else
      @errors = @user.errors

      false
    end
  end
end
