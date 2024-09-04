class UsersCreateAdminService
  attr_reader :user

  def initialize(params)
    @user = User.new(params)
    @user.role = :admin
  end
end
