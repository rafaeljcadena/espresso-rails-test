
class UsersFindService
  attr_reader :user

  def initialize(id, current_user)
    @user = User.where(id: id, company: current_user.company).first

    raise ActiveRecord::RecordNotFound 'Usuário não encontrado' if @user.blank?
  end
end
